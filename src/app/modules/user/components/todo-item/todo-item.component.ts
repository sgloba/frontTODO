import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {TodoI} from 'src/app/modules/user/models/app.todo.model';

import {TasksSandboxService} from 'src/app/modules/user/services/tasks-sandbox.service';
import {faCheck, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {

    this.taskSandbox.selectedTodoId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
      this.highlight = id === this.todo._id;
    });
  }
  unsubscribe$ = new Subject<void>();



  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit = false;
  highlight = false;
  isTodoDisabled = false;



  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  ngOnInit() {
    this.taskSandbox.isTodoDisabled$(this.todo._id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((disabled) => {
      this.isTodoDisabled = disabled;
    });
  }




    removeTodo(): void {
    this.taskSandbox.remove(this.todo._id);
  }

  toggleActive(): void {
    this.taskSandbox.toggleActive(this.todo._id);
  }

  onSpanBlur(): void {
    if (this.isTodoDisabled) {
      return;
    }
    this.taskSandbox.editValue(this.todo._id, this.editableSpan.nativeElement.innerText);
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
    this.taskSandbox.selectTodo(this.todo._id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
