import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

import { ToolbarAction } from '../shared/article-toolbar-action';

@Component({
  selector: 'app-article-list-toolbar',
  templateUrl: './article-list-toolbar.component.html',
  styleUrls: ['./article-list-toolbar.component.css']
})
export class ArticleListToolbarComponent implements OnInit {

  @Input() multiMode: Boolean;
  @Output() action = new EventEmitter<ToolbarAction>();

  public currentApplicationVersion: string = environment.appVersion;
  public readonly toolbarAction: typeof ToolbarAction = ToolbarAction;

  constructor() { }

  ngOnInit(): void {
  }
}
