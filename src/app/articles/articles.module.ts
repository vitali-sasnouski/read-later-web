import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../ui/ui.module';
import { AuthService } from '../auth/auth.service';

import { ArticleListComponent } from './article-list/article-list.component';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListToolbarComponent } from './article-list-toolbar/article-list-toolbar.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    ArticlesRoutingModule
  ],
  providers: [AuthService]
})
export class ArticlesModule { }
