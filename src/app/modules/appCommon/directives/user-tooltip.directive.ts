import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {UserTooltipComponent} from "../components/user-tooltip/user-tooltip.component";

@Directive({
  selector: '[appUserTooltip]'
})
export class UserTooltipDirective implements AfterViewInit, OnDestroy {

  constructor(
    private vc: ViewContainerRef,
    private elem: ElementRef,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {
  }
  userRegex = new RegExp(/\[\w+@\w+\.\w+]/gi);
  unsubscribe$ = new Subject();

  ngAfterViewInit(): void {
    const el = this.elem.nativeElement;
    const text = el.textContent;

    el.innerHTML = text.replace(
      this.userRegex,
      (match) => {
        return `<span #anchor class="user-email" style="color:red;cursor:pointer;position:relative">${match}</span>`;
      });

    const elChildren = el.querySelectorAll('.user-email');

    elChildren.forEach((element) => {
      fromEvent(element, 'mouseenter')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          const componentFactory = this.resolver.resolveComponentFactory(UserTooltipComponent);
          const componentRef = this.vc.createComponent(componentFactory);

          (componentRef.instance).data = element.textContent.slice(1, length - 1);

          this.renderer.appendChild(
            element,
            componentRef.location.nativeElement
          );
          componentRef.instance.detect();
        });

      fromEvent(element, 'mouseleave')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.vc.remove(0);
        });

    });


  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
