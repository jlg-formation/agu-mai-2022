import { TestBed } from '@angular/core/testing';
import { articleToRemove, testArticles } from 'src/test/articles.fixture';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created with localStorage', () => {
    localStorage.setItem('articles', JSON.stringify(testArticles));
    service = TestBed.inject(ArticleService);
    expect(service).toBeTruthy();
  });

  it('should be created without localstorage', () => {
    localStorage.clear();
    service = TestBed.inject(ArticleService);
    expect(service).toBeTruthy();
  });
});
