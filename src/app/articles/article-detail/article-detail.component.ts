import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const subscription = this.articleService
        .fetchItem(params.get('id'))
        .subscribe((doc: Article) => {
          subscription.unsubscribe();

          this.articleForm.get('title').setValue(doc.title);
          this.articleForm.get('url').setValue(doc.url);
        });
    });
  }

  onFormSubmit() {
    debugger;
  }
}
