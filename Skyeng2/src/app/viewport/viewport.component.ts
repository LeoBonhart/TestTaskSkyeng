import { Component, HostBinding, HostListener } from '@angular/core';
import { ViewportService } from './viewport.service';

// Вспомогательный компонент
@Component({
  template: '',
})
export class ViewportComponent {

  private type: string;

  constructor(private service: ViewportService) { }

  @HostBinding('style.display') get display() {
    return 'none';
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.service.canShow().subscribe(type => {
      if (this.type !== type) {
        this.type = type;
        this.service.stream$.next();
      }
    });
  }

}
