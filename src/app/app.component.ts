import { Component, element } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
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

  public items: Observable<Article[]>;
  public multiMode: boolean = false;
  public unreadItems: Article[];

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
    });

    this.itemCollection = afs.collection<Article>('articles', ref => ref.orderBy('created'));
    this.items = this.itemCollection.valueChanges();

    this.items.subscribe(data => {
      this.unreadItems = data.filter(element => !element.read && !element.deleted);
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
    const output = [];

    this.unreadItems.forEach(item => {
      output.push(`[${item.title}](${item.url})\n\n`);
    });

    const blob = new Blob(output, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Readme.md");
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
