import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabsService } from './tabs.service';

@Component({
  template: '',
  providers: [
    TabsService
  ]
})
export class StreamTemplateComponent implements OnDestroy {

  public set streams(v: Subscription) {
  this._streams.push(v);
  }
  protected _streams: Array<Subscription> = new Array<Subscription>();


  constructor(protected tabService: TabsService) { }

  unsubscribe(streams: Array<Subscription>): void {
    for (const stream of streams) {
      stream.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.tabService.unsubscribe(this._streams);
  }

}
