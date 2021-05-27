import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { ViewportModule } from './viewport/viewport.module';
import { ViewportSettingService, VIEWPORT_DEFAULT_OPTIONS } from './viewport/viewport-setting.service';
import { ViewportConfig } from './viewport/viewport.config';

@NgModule({
  declarations: [
    AppComponent, HelloComponent, TestComponent
  ],
  imports: [
    BrowserModule,
    ViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(setting: ViewportSettingService) {
    setting.config.large = 1300;
    setting.config.medium = 700;
  }

  // constructor(@Inject(VIEWPORT_DEFAULT_OPTIONS) public config: ViewportConfig) {
  //   config.large = 1300;
  //   config.medium = 700;
  // }
}
