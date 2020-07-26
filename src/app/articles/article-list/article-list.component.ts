import { Observable, SubscriptionLike as ISubscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { saveAs } from 'file-saver';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';
import { ArticlesService } from '../articles.service';

import { ArticleBase, Article } from '../../model/article';
import { ItemEditDialogComponent } from '../../item-edit-dialog/item-edit-dialog.component';
import { ImportExportDialogComponent } from '../../import-export-dialog/import-export-dialog.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public items$: Observable<Article[]>;
  public multiMode = false;
  public unreadItems: Article[];
  public loaded = false;
  public version: string = environment.version;

  constructor(private articles: ArticlesService,
              private auth: AuthService,
              public dialog: MatDialog) {
    this.loaded = true;
  }

  ngOnInit() {
    this.items$ = this.articles.fetchData();
  }

  addItem(item: ArticleBase): void {
    this.articles.addItem(item);
  }

  markItemAsDone(item: Article): void {
    this.articles.markItemAsDone(item);
  }

  editItem(id: string): void {

  }

  deleteItem(item: Article): void {
    this.articles.deleteItem(item);
  }

  undoDelete(item: Article): void {
    this.articles.undoDelete(item);
  }

  importArticles(): void {
    const dialogRef = this.dialog.open(ImportExportDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object && result.length) {
        let i = 0;

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
    const subscription: ISubscription = this.articles.getActiveItems().subscribe(data => {
      const output = [];

      data.forEach(item => {
        output.push(`[${item.title}](${item.url})\n\n`);
      });

      const blob = new Blob(output, {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'Readme.md');

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
        this.articles.addItem(result);
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

  logout() {
    this.auth.logout();
  }
}
