import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item {
  title: string;
  url: string;
}

enum Operation {
  done,
  edit,
  delete
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

  public operation = Operation;
  
  constructor(private readonly afs: AngularFirestore) {
    this.itemCollection = afs.collection<Item>('articles');
    this.items = this.itemCollection.valueChanges();
  }

  addItem(item: Item) {
    this.itemCollection.add(item);
  }

  processItem(item: Item, operation: Operation) {
  }
}
