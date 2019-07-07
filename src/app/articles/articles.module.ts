import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../ui/ui.module';
import { AuthService } from '../auth/auth.service';

import { ArticleListComponent } from './article-list/article-list.component';

import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    UIModule,
    ArticlesRoutingModule
  ],
  providers: [AuthService]
})
export class ArticlesModule { }
