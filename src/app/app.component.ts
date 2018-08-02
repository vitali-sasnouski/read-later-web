import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item {
  title: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private itemCollection: AngularFirestoreCollection<Item>;

  public items: Observable<Item[]>;
  public newItem: Item = { title: '', url: '' };

  constructor(private readonly afs: AngularFirestore) {
    this.itemCollection = afs.collection<Item>('articles');
    this.items = this.itemCollection.valueChanges();
  }

  addItem(item: Item) {
    this.itemCollection.add(item);
  }

  markItemAsDone(item: Item) {

  }

  editItem(item: Item) {

  }

  deleteItem(item: Item) {

  }

  importArticles() {

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
