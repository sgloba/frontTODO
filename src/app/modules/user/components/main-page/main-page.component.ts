import {Component} from '@angular/core';
import {TasksSandboxService} from "../../services/tasks-sandbox.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {
    this.taskSandbox.selectedTodoId$.subscribe((id) => {
      this.sidenavOpened = !!id;
    })
  }


  sidenavOpened: boolean
}
