import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportDirective } from './viewport.directive';
import { ViewportService } from './viewport.service';
import { ViewportComponent } from './viewport.component';
import { DomService } from './dom.service';

@NgModule({
  declarations: [ViewportDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ViewportDirective
  ],
  providers: [
    ViewportService,
    DomService
  ]
})
export class ViewportModule {
  constructor(private dom: DomService<ViewportComponent>) {
    this.dom.appendComponentToBody(ViewportComponent);
  }
}
