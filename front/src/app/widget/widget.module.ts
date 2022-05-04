import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { TruncatePipe } from './truncate.pipe';



@NgModule({
  declarations: [
    AutofocusDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutofocusDirective,
    TruncatePipe
  ]
})
export class WidgetModule { }
