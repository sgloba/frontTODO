import {Component} from '@angular/core';
import {TasksSandboxService} from '../../services/tasks-sandbox.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sidenavOpened = !!params.todo;
    });
  }


  sidenavOpened: boolean;
}
