import { Component, OnInit, TemplateRef, AfterViewInit, HostBinding, ViewChild, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { StreamTemplateComponent } from '../stream.template.component';
import { TabsService } from '../tabs.service';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html'
})
export class TabComponent extends StreamTemplateComponent implements OnInit, AfterViewInit, OnDestroy {

  active: boolean = false;

  private id = this.tabService.randomInt(10000, 99990);

  @HostBinding('style.display') get display() {
    return 'flex';
  }
  @HostBinding('style.flex-direction') get direction() {
    return 'column';
  }

  @ViewChild('tabcontent', { static: false }) tabcontent: TemplateRef<any>;

  constructor(tabService: TabsService, private renderer: Renderer2, private ref: ElementRef<HTMLElement>) {
    super(tabService);
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.ref.nativeElement.children[0], 'data-id', this.id.toString());
    this.streams = this.tabService.template$.subscribe((x) => {
      this.active = this.tabService.isActive(this.id);
    });
  }

  ngAfterViewInit(): void {
    this.tabService.addTab(this.id, this.tabcontent);
  }

  ngOnDestroy(): void {
    this.tabService.removeTab(this.id);
    super.ngOnDestroy();
  }

}
