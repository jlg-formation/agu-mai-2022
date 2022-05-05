import { Article } from 'src/app/interfaces/article';

export const articleToAdd: Article = {
  name: 'Truc',
  price: 1.23,
  qty: 234,
};

export const articleToRemove: Article = {
  id: '12345',
  name: 'Truc',
  price: 1.23,
  qty: 234,
};

export const testArticles: Article[] = [
  {
    id: '12345',
    name: 'Truc',
    price: 1.23,
    qty: 234,
  },
  {
    id: '345678',
    name: 'Bidule',
    price: 21.23,
    qty: 5,
  },
];
