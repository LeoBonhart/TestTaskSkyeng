import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ViewportConfig } from './viewport.config';

export const VIEWPORT_DEFAULT_OPTIONS =
    new InjectionToken<ViewportConfig>('viewport-default-options', {
      providedIn: 'root',
      factory: VIEWPORT_DEFAULT_OPTIONS_FACTORY,
    });

export function VIEWPORT_DEFAULT_OPTIONS_FACTORY(): ViewportConfig {
  return new ViewportConfig();
}
@Injectable({
  providedIn: 'root'
})
export class ViewportSettingService {

  constructor(@Inject(VIEWPORT_DEFAULT_OPTIONS) public config: ViewportConfig) {
  }
}
