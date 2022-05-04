import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles = this.getArticles();
  async add(article: Article) {
    this.articles.push(article);
    this.save();
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
  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  constructor() {}
}
