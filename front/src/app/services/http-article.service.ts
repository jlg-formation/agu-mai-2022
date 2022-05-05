import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article';
import { delay, lastValueFrom, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('http article service instantiated.');
    this.refresh();
  }

  override async refresh() {
    await super.refresh();
    const articles = await lastValueFrom(
      this.http.get<Article[]>('/api/articles').pipe(timeout(5000), delay(2000))
    );
    this.articles = articles;
    this.save();
  }

  override async add(article: Article): Promise<void> {
    await super.add(article);
    await lastValueFrom(
      this.http.post<void>('/api/articles', article).pipe(delay(10))
    );
    console.log('next');
    await this.refresh();
  }

  override async remove(articles: Set<Article>): Promise<void> {
    await super.remove(articles);
    console.log('articles: ', articles);
    const ids = [...articles].map((a) => a.id);
    console.log('ids: ', ids);
    lastValueFrom(
      this.http
        .delete<void>('/api/articles', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ids),
        })
        .pipe(delay(10))
    );
    console.log('next');
    await this.refresh();
  }
}
