import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  Type
} from '@angular/core';

@Injectable()
export class DomService<T> {

  /** Экзепляр компонента */
  public instance: T;
  /** Компонент */
  private component: Type<T>;
  /** Ссылка на компонент */
  private componentRef: ComponentRef<T>;
  /** Дом элемент компонета */
  private domElem: HTMLElement;
  /** Куда будет добавлен компонент */
  private readonly target: HTMLElement = document.body;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  /**
   * Добавление компонета в тело сайта
   * @param component Компонент
   * ## Пример
   * Передавать нужно не экземпляр, а ссылку компонета
   * ```ts
   * import { YourComponent } from './appended.component';
   * import { DomService } from './dom.service';
   *  ...
   * constructor(private dom: DomService<YourComponent>) {
   *   this.dom.appendComponentToBody(YourComponent);
   * }
   * ```
   */
  appendComponentToBody(component: Type<T>) {
    this.component = component;
    this.createRef();
    this.attach();
    this.getDom();
    this.append();
  }

  /**
   * Создание ссылки компонета
   */
  private createRef() {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory<T>(this.component)
      .create(this.injector);
    this.instance = this.componentRef.instance;
  }

  /**
   * Прикрепите компонент к appRef так, чтобы он находился внутри дерева компонентов ng
   */
  private attach() {
    this.appRef.attachView(this.componentRef.hostView);
  }

  /**
   * Получение дом элемента
   */
  private getDom() {
    this.domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Добавление компонента в тело
   */
  private append() {
    this.target.appendChild(this.domElem);
  }

  /**
   * Удаление компонента из дерева компонета и дом дерева
   */
  destroy() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
