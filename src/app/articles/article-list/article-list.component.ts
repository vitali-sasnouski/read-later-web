import { Observable, SubscriptionLike as ISubscription, from } from 'rxjs';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatListOption } from '@angular/material/list';

import { saveAs } from 'file-saver';

import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';
import { ArticlesService } from '../shared/articles.service';
import { ToolbarAction } from '../shared/article-toolbar-action';

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
  public activeItems$: Observable<Article[]>;
  public multiMode = false;
  public loaded = false;
  public currentApplicationVersion: string = environment.appVersion;

  public selectedArticles: Article[];

  @ViewChild('muliSelectList')
  private muliSelectList: MatSelectionList;

  constructor(private articles: ArticlesService,
              private auth: AuthService,
              public dialog: MatDialog) {
    this.loaded = true;
  }

  ngOnInit() {
    this.items$ = this.articles.fetchData();
    this.activeItems$ = this.articles.getActiveItems();
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

  onToolbarAction(action): void {
    switch (action) {
      case ToolbarAction.Add:
        this.openNewItemDialog();
        break;

      case ToolbarAction.Import:
        this.import();
        break;

      case ToolbarAction.Export:
        this.export();
        break;

      case ToolbarAction.Backup:
        this.backup();
        break;

      case ToolbarAction.EditList:
        this.editList();
        break;

      case ToolbarAction.CancelEdit:
        this.cancelEdit();
        break;

      case ToolbarAction.DeleteSelected:
        this.deleteSelected();
        break;

      case ToolbarAction.MarkSelectedAsDone:
        this.markSelectedAsDone();
        break;

      case ToolbarAction.SelectAll:
        this.selectAll();
        break;

      case ToolbarAction.Logout:
        this.logout();
        break;
    }
  }

  import(): void {
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

  export(): void {
    const subscription: ISubscription = this.activeItems$.subscribe(data => {
      const output = [];

      data.forEach(item => {
        output.push(`[${item.title}](${item.url})\n\n`);
      });

      const blob = new Blob(output, {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'Readme.md');

      subscription.unsubscribe();
    });
  }

  backup(): void {
    const subscription: ISubscription = this.articles.getAllItems().subscribe(data => {
      const timestamp = new Date().toISOString();

      const blob = new Blob([JSON.stringify(data, null, '\t')], {type: 'application/json;charset=utf-8'});
      saveAs(blob, `Readme_backup_${timestamp}.json`);

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
    if (!this.selectedArticles || !this.selectedArticles.length) {
      this.muliSelectList.selectAll();
    } else {
      this.muliSelectList.deselectAll();
    }
  }

  deleteSelected(): void {
    this.selectedArticles.forEach(article => this.deleteItem(article));
    this.selectedArticles = [];
  }

  markSelectedAsDone(): void {
    this.selectedArticles.forEach(article => this.markItemAsDone(article));
    this.selectedArticles = [];
  }

  cancelEdit() {
    this.muliSelectList.deselectAll();
    this.multiMode = false;
  }

  logout() {
    this.auth.logout();
  }
}
