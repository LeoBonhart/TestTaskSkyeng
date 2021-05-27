import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

interface ITabs{
  id: number;
  template: TemplateRef<any>;
  active: boolean;
}

@Injectable()
export class TabsService {

  template$: Subject<number> = new Subject<number>();

  private tabs: Array<ITabs> = new Array<ITabs>();

  constructor() { }

  setActiveTab(id: number | string | null) {
    if (id === null) {
      this.template$.next(null);
    } else {
      this.setActive(id);
      this.template$.next(this.id(id));
    }
  }

  addTab(id: number, template: TemplateRef<any>): ITabs {
    let active: boolean = false;
    if (this.tabs.length === 0) {
      active = true;
    }
    const obj: ITabs = {
      id,
      template,
      active
    };
    this.tabs.push(obj);
    return obj;
  }

  removeTab(id: number) {
    this.getIdIndex(id, (index) => {
      if (this.tabs[index].active) {
        this.tabs.splice(index, 1);
        this.setActiveTab(this.tabs.length > 0 ? this.tabs[0].id : null);
        return;
      }
      this.tabs.splice(index, 1);
    });
  }

  getTemplateById(id: number) {
    return this.tabs.filter(x => x.id === id)[0].template;
  }

  isActive(id: number | string): boolean {
    return this.tabs.filter(x => x.id === this.id(id) && x.active).length > 0;
  }

  setActive(id: number | string) {
    for (const tab of this.tabs) {
      tab.active = tab.id === this.id(id) ? true : false;
    }
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  unsubscribe(streams: Array<Subscription>): void {
    for (const stream of streams) {
      stream.unsubscribe();
    }
  }

  private getIdIndex(id: number | string, callback: (index: number) => void) {
    if (this.tabs && this.tabs.length > 0) {
      const index = this.tabs.findIndex(x => x.id === this.id(id));
      if (index !== -1) {
        callback(index);
      }
    }
  }

  private id(id: number | string): number {
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }

}

