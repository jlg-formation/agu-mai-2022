import { Component, OnInit } from '@angular/core';
import {
  faRotateRight,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashCan = faTrashCan;

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

  constructor() {}

  ngOnInit(): void {}
}
