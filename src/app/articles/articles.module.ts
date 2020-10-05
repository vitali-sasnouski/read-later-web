import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../ui/ui.module';
import { AuthService } from '../auth/auth.service';

import { ArticleListComponent } from './article-list/article-list.component';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListToolbarComponent } from './article-list-toolbar/article-list-toolbar.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListToolbarComponent,
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    ArticlesRoutingModule
  ],
  providers: [AuthService]
})
export class ArticlesModule { }
