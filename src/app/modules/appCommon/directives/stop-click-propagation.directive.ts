
import {Directive, HostListener} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[stop-click-propagation]'
})
export class StopClickPropagationDirective
{
  @HostListener('click', ['$event'])
  public onClick(event: any): void
  {
    event.stopPropagation();
    event.preventDefault();
  }
}
