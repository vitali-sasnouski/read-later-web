import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { environment } from '../../../environments/environment';

import { ToolbarAction } from '../shared/article-toolbar-action';

@Component({
  selector: 'app-article-list-toolbar',
  templateUrl: './article-list-toolbar.component.html',
  styleUrls: ['./article-list-toolbar.component.css']
})
export class ArticleListToolbarComponent implements OnInit {

  public currentApplicationVersion: string = environment.appVersion;
  public multiMode = false;
  public readonly toolbarAction: typeof ToolbarAction = ToolbarAction;

  @Output() action = new EventEmitter<ToolbarAction>();

  constructor() { }

  ngOnInit(): void {
  }
}
