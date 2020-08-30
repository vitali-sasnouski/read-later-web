import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-article-list-toolbar',
  templateUrl: './article-list-toolbar.component.html',
  styleUrls: ['./article-list-toolbar.component.css']
})
export class ArticleListToolbarComponent implements OnInit {

  public currentApplicationVersion: string = environment.appVersion;
  public multiMode = false;

  @Output() itemAdd = new EventEmitter();
  @Output() editCanceled = new EventEmitter();
  @Output() listEdit = new EventEmitter();
  @Output() allSelect = new EventEmitter();
  @Output() selectedDelete = new EventEmitter();
  @Output() selectedMarkAsDone = new EventEmitter();
  @Output() articlesImport = new EventEmitter();
  @Output() articlesExport = new EventEmitter();
  @Output() articlesBackup = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancelEdit() {
    this.editCanceled.emit();
  }

  addItem() {
    this.itemAdd.emit();
  }

  editList() {
    this.listEdit.emit();
  }

  selectAll() {
    this.allSelect.emit();
  }

  deleteSelected() {
    this.selectedDelete.emit();
  }

  markSelectedAsDone() {
    this.selectedMarkAsDone.emit();
  }

  importArticles() {
    this.articlesImport.emit();
  }

  exportArticles() {
    this.articlesExport.emit();
  }

  backupArticles() {
    this.articlesBackup.emit();
  }
}
