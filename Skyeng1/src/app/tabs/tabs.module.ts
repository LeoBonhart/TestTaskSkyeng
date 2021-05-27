import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { TitleComponent } from './tab/title/title.component';
import { ContentComponent } from './tab/content/content.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TitleComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabComponent,
    TabsComponent,
    TitleComponent,
    ContentComponent
  ],
  providers: [
  ]
})
export class TabsModule { }
