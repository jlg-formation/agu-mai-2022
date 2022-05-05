import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article';

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
    super.refresh();
    this.http.get<Article[]>('/api/articles').subscribe({
      next: (articles) => {
        console.log('next', articles);
        this.articles = articles;
        this.save();
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  override async add(article: Article): Promise<void> {
    await super.add(article);
    this.http.post<void>('/api/articles', article).subscribe({
      next: () => {
        console.log('next');
        this.refresh();
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  override async remove(articles: Set<Article>): Promise<void> {
    await super.remove(articles);
    console.log('articles: ', articles);
    const ids = [...articles].map((a) => a.id);
    console.log('ids: ', ids);
    this.http
      .delete<void>('/api/articles', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      })
      .subscribe({
        next: () => {
          console.log('next');
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
