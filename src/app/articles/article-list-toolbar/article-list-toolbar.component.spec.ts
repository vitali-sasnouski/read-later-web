import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListToolbarComponent } from './article-list-toolbar.component';

describe('ArticleListToolbarComponent', () => {
  let component: ArticleListToolbarComponent;
  let fixture: ComponentFixture<ArticleListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
