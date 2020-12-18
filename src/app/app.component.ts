import { Component } from '@angular/core';
import {TasksSandboxService} from "./services/tasks-sandbox.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'frontTODO';
  constructor(private readonly tasksSandbox: TasksSandboxService) {
    this.tasksSandbox.allTodos$.subscribe(a => console.log('allTodos$', a));
  }
}
