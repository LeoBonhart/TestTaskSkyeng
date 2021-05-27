import { AfterViewInit, Component, HostBinding, HostListener, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { StreamTemplateComponent } from '../../stream.template.component';
import { TabsService } from '../../tabs.service';

@Component({
  selector: 'tab-title',
  templateUrl: './title.component.html'
})
export class TitleComponent extends StreamTemplateComponent implements OnInit, AfterViewInit, OnDestroy {

  active: boolean = false;

  id: string;

  @HostBinding('class.tabs__title') get tabsTitle() {
    return true;
  }

  @HostBinding('class.tabs__title--active') get tabsTitleActive() {
    return this.active;
  }

  constructor(tabService: TabsService, private ref: ElementRef<HTMLElement>) {
    super(tabService);
  }

  @HostListener('click') changeContent() {
    this.tabService.setActiveTab(this.id);
  }

  ngOnInit(): void {
    this.id = this.ref.nativeElement.dataset.id;
    this.streams = this.tabService.template$.subscribe((x) => {
      this.active = this.tabService.isActive(this.id);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active = this.tabService.isActive(this.id);
      if (this.active) {
        this.changeContent();
      }
    }, 0);
  }

}
