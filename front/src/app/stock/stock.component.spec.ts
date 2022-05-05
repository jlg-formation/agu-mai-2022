import { ComponentFixture, TestBed } from '@angular/core/testing';
import { articleToAdd } from 'src/test/articles.fixture';
import { WidgetModule } from '../widget/widget.module';

import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetModule],
      declarations: [StockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.refresh();
    component.remove();
    component.toggle(articleToAdd);
    expect(component).toBeTruthy();
  });
});
