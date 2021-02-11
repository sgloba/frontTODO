import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TodoI} from 'src/app/modules/user/models/app.todo.model';

import {TasksSandboxService} from 'src/app/modules/user/services/tasks-sandbox.service';
import {faCheck, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit,OnDestroy {

  constructor(
    private taskSandbox: TasksSandboxService,
    private route: Router,
  ) { }

  unsubscribe$ = new Subject<void>();


  @ViewChild('editableSpan')
  editableSpan: ElementRef;

  @Input() todo: TodoI = {} as TodoI;

  allowEdit = false;
  highlight$ = this.taskSandbox.selectedTodoId$
    .pipe(
      map((id) => id === this.todo._id)
    );
  isTodoDisabled = false;


  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  ngOnInit(): void {
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

  onSelectTodo(): void {
    this.route.navigate(['/main'], { queryParams: { todo: this.todo._id }, queryParamsHandling: 'merge' });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
