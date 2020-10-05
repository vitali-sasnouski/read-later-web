import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ArticlesService } from '../shared/articles.service';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  public id: string;

  public articleForm = new FormGroup({
    title: new FormControl(''),
    url: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');

      const subscription = this.articleService
        .fetchItem(this.id)
        .subscribe((doc: Article) => {
          subscription.unsubscribe();

          this.articleForm.get('title').setValue(doc.title);
          this.articleForm.get('url').setValue(doc.url);
        });
    });
  }
}
