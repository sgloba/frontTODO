import {Component, ElementRef, HostBinding, Input, ViewChild} from '@angular/core';
import {TodoI} from 'src/app/models/app.todo.model';

import { TasksSandboxService } from 'src/app/services/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs/operators";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {

    this.taskSandbox.selectedTodoId$.subscribe((id) => {
      this.highlight = id === this.todo._id
    })
  }


  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit: boolean = false;
  highlight: boolean = false;

  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  removeTodo(): void {
    this.taskSandbox.remove(this.todo._id);
  }

  toggleActive(): void {
    this.taskSandbox.toggleActive(this.todo._id);
  }

  onSpanBlur(): void {
      this.taskSandbox.editValue(this.todo._id, this.editableSpan.nativeElement.innerText);
  }

  onSpanInput(): void {
  }

  toggleSpanEditable(): void {
   this.allowEdit = !this.allowEdit;

   if (this.allowEdit) {
      setTimeout(() => {
        this.editableSpan.nativeElement.focus();
      }, 0);
    }
  }

  onSelectTodo() {
    this.taskSandbox.selectTodo(this.todo._id)
  }

}
