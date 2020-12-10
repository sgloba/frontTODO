import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TodoI} from "src/app/models/app.todo.model";

import { TasksSandboxService } from 'src/app/services/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {}

  ngOnInit() {

  }
  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit = false

  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  removeTodo(id: number): void {
    this.taskSandbox.remove(id)
  }

  toggleActive(id: number): void {
    this.taskSandbox.toggleActive(id)
  }

  onSpanBlur(id) {
      this.taskSandbox.editValue(id, this.editableSpan.nativeElement.innerText)
  }

  toggleSpanEditable() {
   this.allowEdit = !this.allowEdit

    if (this.allowEdit) {
      setTimeout(() => {
        this.editableSpan.nativeElement.focus()
      },0)
    }
  }

}
