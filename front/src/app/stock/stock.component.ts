import { Component } from '@angular/core';
import {
  faAtom,
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  faAtom = faAtom;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  async refresh() {
    try {
      console.log('refresh');
      this.isRefreshing = true;
      await this.articleService.refresh();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  remove() {
    (async () => {
      try {
        this.isRemoving = true;
        console.log('remove');
        await this.articleService.remove(this.selectedArticles);
        this.selectedArticles.clear();
      } catch (err) {
        console.log('err: ', err);
      } finally {
        this.isRemoving = false;
      }
    })();
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
