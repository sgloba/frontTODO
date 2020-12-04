import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo Angular 11';
  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;


  todos: object[] = [
    {
      value: 'hardcoded',
      active: true,
      id: Math.floor(Math.random()*Number(Date.now()))
    }
  ]

  addTodo(value):void {
    if(value.todo === '') return

    this.todos = [
      {value: value.todo, active: true, id: Math.floor(Math.random()*Number(Date.now()))},
      ...this.todos
    ]
    console.log(this.todos)
  }
  deleteTodo(index):void {
    this.todos.splice(index,1)
  }

}
