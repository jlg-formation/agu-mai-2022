import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAtom, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Tournevis', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    price: new FormControl(1.23, [Validators.required]),
    qty: new FormControl(45, [Validators.required]),
  });

  isAdding = false;

  faPlus = faPlus;
  faAtom = faAtom;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  submit() {
    (async () => {
      try {
        this.isAdding = true;
        await this.articleService.add(this.f.value as Article);
        this.isAdding = false;
        await this.router.navigate(['..'], { relativeTo: this.route });
      } catch (err) {
        console.log('err: ', err);
        this.isAdding = false;
      }
    })();
  }
}
