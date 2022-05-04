import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
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
  async add(article: Article) {
    this.articles.push(article);
  }

  constructor() {}
}
