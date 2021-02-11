import { Component, OnInit } from '@angular/core';
import {TasksSandboxService} from '../../modules/todo/services/tasks-sandbox.service';

@Component({
  selector: 'app-floating-action-btns',
  templateUrl: './floating-action-btns.component.html',
  styleUrls: ['./floating-action-btns.component.scss']
})
export class FloatingActionBtnsComponent implements OnInit {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) { }

  ngOnInit(): void {
  }

}
