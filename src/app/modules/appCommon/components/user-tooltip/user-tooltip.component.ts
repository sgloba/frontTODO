import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, Input, OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import {UserHttpService} from "../../../user/services/user-http.service";

@Component({
  selector: 'app-user-tooltip',
  templateUrl: './user-tooltip.component.html',
  styleUrls: ['./user-tooltip.component.scss']
})
export class UserTooltipComponent {
  data: string;
  user: string;
  constructor(
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private userHttpService: UserHttpService
  ) { }
  @ViewChild('wrap') wrap: ElementRef;

  detect(): void {
    this.user = this.userHttpService.fetchUsersByEmail$(this.data);
    this.changeDetectorRef.markForCheck();
  }


  click() {

  }
}
