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
  public newItem: Article = { title: '', url: '', read: false, deleted: false };

  constructor(private readonly afs: AngularFirestore, public dialog: MatDialog) {
    this.itemCollection = afs.collection<Article>('articles');
    this.items = this.itemCollection.valueChanges();
  }

  addItem(item: Article) {
    this.itemCollection.add(item);
  }

  markItemAsDone(item: Article) {

  }

  editItem(item: Article) {

  }

  deleteItem(item: Article) {

  }

  importArticles() {

  }

  openNewItemDialog() {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '500px',
      data: {
        title: 'Как появлялись подпольные миллионеры в СССР. История королей «советского чёрного рынка»',
        url: 'http://1863x.com/ussr-millionery/'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {

      }
    });
  }

  editList() {

  }

  selectAll() {

  }

  deleteSelected() {

  }

  markSelectedAsDone() {

  }

  cancelEdit() {
    
  }
}
