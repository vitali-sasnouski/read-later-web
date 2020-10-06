import { Injectable } from '@angular/core';

import { of as observableOf,
         combineLatest as observableCombineLatest,
         Observable,
         SubscriptionLike as ISubscription } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { ArticleBase, Article } from '../../model/article';
import { LoadingService } from '../../loading.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private itemCollection: AngularFirestoreCollection<Article>;
  private currentDate: Date = new Date();

  constructor(private readonly afs: AngularFirestore,
              private loadingService: LoadingService) { this.loadingService.start(); }

  fetchData(): Observable<Article[]> {
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

    const items$ = observableCombineLatest([unreadArticlesRef.valueChanges(),
                     readArticlesRef.valueChanges(),
                     deletedArticlesRef.valueChanges()]).pipe(
      switchMap(articles => {
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

        this.loadingService.stop();
        return observableOf(combined);
      }));

    return items$;
  }

  fetchItem(id: string): Observable<unknown> {
    return this.afs.collection<Article>('articles').doc(id).valueChanges();
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

  updateItem(item: Article): void {
    this.itemCollection.doc(item.id).update(item);
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

  getActiveItems(): Observable<Article[]> {
    return this.afs.collection<Article>('articles', ref =>
      ref
        .where('read', '==', false)
        .where('deleted', '==', false)
        .orderBy('created')
    ).valueChanges();
  }

  getAllItems(): Observable<Article[]> {
    return this.afs.collection<Article>('articles', ref =>
      ref.orderBy('created')).valueChanges();
  }
}
