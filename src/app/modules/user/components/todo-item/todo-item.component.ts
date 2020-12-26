import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {TodoI} from 'src/app/modules/user/models/app.todo.model';

import { TasksSandboxService } from 'src/app/modules/user/services/tasks-sandbox.service';
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
      this.highlight = id === this.todo._id
    })

    const id = this.todo._id;
  }

  ngOnInit() {
    this.taskSandbox.isTodoDisabled1$(this.todo._id).subscribe((disabled) => {
      this.isTodoDisabled = disabled;
    })
  }

  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit: boolean = false;
  highlight: boolean = false;
  isTodoDisabled: boolean = false;

  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;



  removeTodo(): void {
    this.taskSandbox.remove(this.todo._id);
  }

  toggleActive(): void {
    document.body.style.cursor='progress';

    if(this.isTodoDisabled) {
      return
    }
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
