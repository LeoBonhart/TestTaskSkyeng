import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewportService } from './viewport.service';

export type ifViewportSize = 'small' | 'medium' | 'large';

@Directive({
  selector: '[ifViewportSize]'
})
export class ViewportDirective implements OnInit, OnDestroy {

  private resizeSubscribe: Subscription;

  private isRendered: boolean = false;

  private readonly listTypes: Array<ifViewportSize> = ['small', 'medium', 'large'];

  private _type: ifViewportSize;
  public get type(): ifViewportSize {
    return this._type;
  }
  public set type(v: ifViewportSize) {
    if (this.listTypes.indexOf(v) === -1) {
      console.warn(`У декоратора ifViewportSize нет такого типа ${v}`);
      return;
    }
    this._type = v;
  }

  @Input() set ifViewportSize(condition: ifViewportSize) {
    this.type = condition;
    this.showContent();
  }

  constructor(private templateRef: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef, private service: ViewportService) { }

  showContent() {
    this.service.canShow().subscribe(type => {
      if (type === this.type) {
        if (!this.isRendered) {
          this.isRendered = true;
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      } else {
        this.viewContainer.clear();
        this.isRendered = false;
      }
    }, error => console.warn(error));
  }

  ngOnInit(): void {
    this.resizeSubscribe = this.service.stream$.subscribe(x => {
      this.showContent();
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscribe.unsubscribe();
  }

}
