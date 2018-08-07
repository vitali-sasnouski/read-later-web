import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { Article } from './model/article';
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
    this.itemCollection = afs.collection<Article>('articles');
    this.items = this.itemCollection.valueChanges();
  }

  addItem(item: Article): void {
    this.itemCollection.add(item);
  }

  markItemAsDone(item: Article): void {

  }

  editItem(item: Article): void {

  }

  deleteItem(item: Article): void {

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
        const created = new Date();

        this.addItem({
          ...result,
          read: false,
          deleted: false,
          created: created,
          changed: created,
        });
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
