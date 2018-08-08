import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { find, tap, filter } from "rxjs/operators";
import { MatDialog } from '@angular/material';

import { ArticleBase, Article } from './model/article';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private itemCollection: AngularFirestoreCollection<Article>;

  public items: Observable<Article[]>;
  public multiMode: boolean = false;

  constructor(private readonly afs: AngularFirestore, public dialog: MatDialog) {
    this.itemCollection = afs.collection<Article>('articles', ref => ref.orderBy('created'));
    this.items = this.itemCollection.valueChanges();
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
}
