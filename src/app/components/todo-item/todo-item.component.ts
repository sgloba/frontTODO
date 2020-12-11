import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {TodoI} from 'src/app/models/app.todo.model';

import { TasksSandboxService } from 'src/app/services/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {}
  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit = false;

  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;


  removeTodo(id: number): void {
    this.taskSandbox.remove(id);
  }

  toggleActive(id: number): void {
    this.taskSandbox.toggleActive(id);
  }

  onSpanBlur(id): void {
      this.taskSandbox.editValue(id, this.editableSpan.nativeElement.innerText);
      this.taskSandbox.setInitialEditingValue(null);
  }

  onSpanInput(): void {
    this.taskSandbox.setNewEditingValue(this.editableSpan.nativeElement.innerText);
  }

  toggleSpanEditable(): void {
   this.allowEdit = !this.allowEdit;

   this.taskSandbox.setInitialEditingValue(this.editableSpan.nativeElement.innerText);

   if (this.allowEdit) {
      setTimeout(() => {
        this.editableSpan.nativeElement.focus();
      }, 0);
    }
  }

}
