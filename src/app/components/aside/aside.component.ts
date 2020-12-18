import {Component, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {SidenavService} from "../../services/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {TasksSandboxService} from "../../services/tasks-sandbox.service";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  constructor(
    private tasksSandboxService: TasksSandboxService
  ) {
    this.tasksSandboxService.selectedTodoId$.subscribe((id) => {
      if(id) {
        this.sidenav.open()
      }
    })
  }

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  taskId: number

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'test task_1', completed: false, color: 'primary'},
      {name: 'test task_2', completed: false, color: 'primary'},
      {name: 'test task_12', completed: false, color: 'primary'}
    ]
  };

  allComplete: boolean = false;
  inputValue: any;


  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }


  sidenavClose(){
    // this.sidenav.close()
    // this.tasksSandboxService.selectTodo(null)
  }

  addPlan(plan: any) {
  }


}
