import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import { MatDialog } from '@angular/material';

import { saveAs } from 'file-saver/FileSaver';

import { ArticleBase, Article } from './model/article';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})
export class AppComponent {
  private itemCollection: AngularFirestoreCollection<Article>;
  private currentDate: Date = new Date();

  public items$: Observable<Article[]>;
  public multiMode: boolean = false;
  public unreadItems: Article[];
  public loaded: boolean = false;

  public credentials = {
    email: "",
    password: ""
  }

  authState: any = null;

  constructor(private readonly afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public dialog: MatDialog) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.loaded = true;

      if (this.authState) {
        this.fetchData();
      }
    });
  }

  private fetchData(): void {
    this.itemCollection = this.afs.collection<Article>('articles');

    const unreadArticlesRef = this.afs.collection<Article>('articles', ref => 
      ref
        .where('read', '==', false)
        .where('deleted', '==', false)
        .orderBy('created')
    );

    const readArticlesRef = this.afs.collection<Article>('articles', ref => 
      ref
        .where('read', '==', true)
        .where('deleted', '==', false)
        .where('changed', '>=', this.currentDate)
    );

    const deletedArticlesRef = this.afs.collection<Article>('articles', ref => 
      ref
        .where('deleted', '==', true)
        .where('changed', '>=', this.currentDate)
    );

    this.items$ = Observable
      .combineLatest(unreadArticlesRef.valueChanges(),
                     readArticlesRef.valueChanges(),
                     deletedArticlesRef.valueChanges())
      .switchMap(articles => {
        const [unread, read, deleted] = articles;

        const combined = unread.concat(read).concat(deleted);
        combined.sort((a: Article, b: Article) => {
          if (a.created < b.created) {
            return -1;
          }

          if (a.created > b.created) {
            return 1;
          }

          return 0;
        });

        return Observable.of(combined);
      });
  }

  addItem(item: ArticleBase): void {
    const id = this.afs.createId(),
          created = new Date();

    const article: Article = {
      id: id,
      ...item,
      read: false,
      deleted: false,
      created: created,
      changed: created
    };

    this.itemCollection.doc(id).set(article);
  }

  markItemAsDone(item: Article): void {
    const updated = { ...item };

    updated.changed = new Date();
    updated.read = true;

    this.itemCollection.doc(item.id).update(updated);
  }

  editItem(id: string): void {

  }

  deleteItem(item: Article): void {
    const updated = { ...item };

    updated.changed = new Date();
    updated.deleted = true;

    this.itemCollection.doc(item.id).update(updated);
  }

  undoDelete(item: Article): void {
    const updated = { ...item };

    updated.changed = new Date();
    updated.deleted = false;

    this.itemCollection.doc(item.id).update(updated);
  }

  importArticles(): void {
    const dialogRef = this.dialog.open(ImportExportDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object && result.length) {
        let i: number = 0;

        const that = this;

        (function loop() {
          that.addItem(result[i]);

          if (++i < result.length) {
            setTimeout(loop, 1000);
          }
        })();
      }
    });
  }

  saveArticles(): void {
    const subscription: ISubscription = this.afs.collection<Article>('articles', ref => 
      ref
        .where('read', '==', false)
        .where('deleted', '==', false)
        .orderBy('created')
    ).valueChanges().subscribe(data => {
      const output = [];

      data.forEach(item => {
        output.push(`[${item.title}](${item.url})\n\n`);
      });
  
      const blob = new Blob(output, {type: "text/plain;charset=utf-8"});
      saveAs(blob, "Readme.md");

      subscription.unsubscribe();
    });
    
  }

  openNewItemDialog(): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '500px',
      data: {
        title: '',
        url: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {
        this.addItem(result);
      }
    });
  }

  editList(): void {
    this.multiMode = true;
  }

  selectAll(): void {

  }

  deleteSelected(): void {

  }

  markSelectedAsDone(): void {

  }

  cancelEdit(): void {
    this.multiMode = false;
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
  }

  logout() {
    this.afAuth.auth.signOut();
  }  
}
