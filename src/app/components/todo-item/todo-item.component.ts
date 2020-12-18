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
  ) {
    this.taskSandbox.selectedTodoId$.subscribe((id) => {
      if(id === this.todo._id) {
        this.highlight = true
      } else {
        this.highlight = false
      }
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
    // this.taskSandbox.remove(this.todo._id);
  }

  toggleActive(): void {
    // this.taskSandbox.toggleActive(this.todo._id);
  }

  onSpanBlur(): void {
      // this.taskSandbox.editValue(this.todo._id, this.editableSpan.nativeElement.innerText);
      // this.taskSandbox.setInitialEditingValue(null);
  }

  onSpanInput(): void {
    // this.taskSandbox.setNewEditingValue(this.editableSpan.nativeElement.innerText);
  }

  toggleSpanEditable(): void {
   this.allowEdit = !this.allowEdit;

   // this.taskSandbox.setInitialEditingValue(this.editableSpan.nativeElement.innerText);

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
