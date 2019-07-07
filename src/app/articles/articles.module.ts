import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../ui/ui.module';

import { ArticleListComponent } from './article-list/article-list.component';

import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    UIModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
