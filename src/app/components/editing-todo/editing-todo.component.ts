import { Component, OnInit } from '@angular/core';
import {TasksSandboxService} from '../../services/tasks-sandbox.service';

@Component({
  selector: 'app-editing-todo',
  templateUrl: './editing-todo.component.html',
  styleUrls: ['./editing-todo.component.scss']
})
export class EditingTodoComponent implements OnInit {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) { }

  initialValue$ = this.taskSandbox.initialEditingValue$;
  newValue$ = this.taskSandbox.newEditingValue$;

  ngOnInit(): void {
  }

}
