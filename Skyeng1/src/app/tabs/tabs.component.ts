import { AfterViewInit, Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { TabsService } from './tabs.service';
import { StreamTemplateComponent } from './stream.template.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  providers: [
    TabsService
  ]
})
export class TabsComponent extends StreamTemplateComponent implements OnInit, AfterViewInit {

  contentTemplate: TemplateRef<any>;

  @HostBinding('style.display') get display() {
    return 'flex';
  }

  @HostBinding('style.flex-direction') get direction() {
    return 'column';
  }

  constructor(tabService: TabsService) {
    super(tabService);
  }

  ngOnInit(): void {
    this.streams = this.tabService.template$.subscribe((x) => {
      if (x === null) {
        this.contentTemplate = null;
      } else {
        this.contentTemplate = this.tabService.getTemplateById(x);
      }
    });
  }

  ngAfterViewInit(): void {
  }

}
