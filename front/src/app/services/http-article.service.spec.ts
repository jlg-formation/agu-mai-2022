import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  articleToAdd,
  articleToRemove,
  testArticles,
} from 'src/test/articles.fixture';
import { Article } from '../interfaces/article';

import { HttpArticleService } from './http-article.service';

describe('HttpArticleService', () => {
  let service: HttpArticleService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpArticleService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    const req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    expect(service).toBeTruthy();
  });

  it('should be created with an error from back-end', () => {
    const req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush('', { status: 404, statusText: 'Not Found' });
    expect(service).toBeTruthy();
  });

  it('should add an article', async () => {
    let req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    await service.add(articleToAdd);
    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('POST');
    req.flush('', { status: 201, statusText: 'Created' });

    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([{ ...articleToAdd, id: '1234' }]);

    expect(service).toBeTruthy();
  });

  it('should add an article with error', async () => {
    let req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    await service.add(articleToAdd);
    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('POST');
    req.flush('', { status: 500, statusText: 'Internal Error' });

    expect(service).toBeTruthy();
  });

  it('should remove an article ', async () => {
    let req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    service.articles = testArticles;
    await service.remove(new Set<Article>([articleToRemove]));
    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('DELETE');
    req.flush('', { status: 204, statusText: 'No Content' });

    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    expect(service).toBeTruthy();
  });

  it('should remove an article with error', async () => {
    let req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    await service.remove(new Set<Article>([articleToRemove]));
    req = http.expectOne('/api/articles');
    expect(req.request.method).toBe('DELETE');
    req.flush('', { status: 500, statusText: 'Internal Error' });

    expect(service).toBeTruthy();
  });
});
