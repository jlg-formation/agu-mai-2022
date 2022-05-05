import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>(this.getArticles());

  constructor() {
    this.articles$.subscribe((articles) => {
      localStorage.setItem('articles', JSON.stringify(articles));
    });
  }

  async add(article: Article) {
    this.articles$.value.push(article);
    this.articles$.next(this.articles$.value);
  }

  getArticles(): Article[] {
    const str = localStorage.getItem('articles');
    if (!str) {
      return [
        {
          name: 'truc',
          price: 2.45,
          qty: 456,
        },
        {
          name: 'bidule',
          price: 2.45,
          qty: 456,
        },
        {
          name: 'truc',
          price: 2.45,
          qty: 456,
        },
        {
          name: 'truc',
          price: 2.45,
          qty: 456,
        },
      ];
    }
    return JSON.parse(str);
  }

  async remove(articles: Set<Article>) {
    this.articles$.next(this.articles$.value.filter((a) => !articles.has(a)));
  }

  async refresh() {}
}
