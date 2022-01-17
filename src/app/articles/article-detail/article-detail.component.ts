import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import firebase from 'firebase/compat/app';
import * as moment from 'moment';

import { ArticlesService } from '../shared/articles.service';
import { Article } from '../../model/article';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  private id = '';
  private article!: Article;

  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    created: new FormControl({ value: new Date(), disabled: true }),
    changed: new FormControl({ value: new Date(), disabled: true })
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    moment.locale('ru');

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.fetchArticleDetail();
    });
  }

  onFormSubmit() {
    this.article.title = this.articleForm.get('title')?.value || '';
    this.article.url = this.articleForm.get('url')?.value || '';

    this.articleService.updateItem(this.article);
  }

  onCancel() {
    this.fetchArticleDetail();
  }

  fetchArticleDetail() {
    const subscription = this.articleService
      .fetchItem(this.id)
      .subscribe({
        next: (doc) => {
          subscription.unsubscribe();

          const articleDetails = doc as Article;

          this.articleForm.get('title')?.setValue(articleDetails.title);
          this.articleForm.get('url')?.setValue(articleDetails.url);

          const created = (articleDetails.created as firebase.firestore.Timestamp).toDate();
          this.articleForm.get('created')?.setValue(moment(created).format('L LTS'));

          const changed = (articleDetails.changed as firebase.firestore.Timestamp).toDate();
          this.articleForm.get('changed')?.setValue(moment(changed).format('L LTS'));

          this.article = { ...articleDetails };

          this.loadingService.stop();
        }
      });
  }
}
