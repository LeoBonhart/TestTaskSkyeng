import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ViewportSettingService } from './viewport-setting.service';
import { ifViewportSize } from './viewport.directive';

@Injectable()
export class ViewportService {

  stream$: Subject<void> = new Subject<void>();

  constructor(private setting: ViewportSettingService) {
  }

  canShow() {
    return new Observable<ifViewportSize>((subscriber) => {
      const viewportWidth = this.getViewportWidth();
      if (viewportWidth < this.setting.config.medium) {
        subscriber.next('small');
      } else if (this.setting.config.medium <= viewportWidth && viewportWidth < this.setting.config.large) {
        subscriber.next('medium');
      } else if (this.setting.config.large <= viewportWidth) {
        subscriber.next('large');
      }
      subscriber.complete();
    });
  }

  private getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  }
}
