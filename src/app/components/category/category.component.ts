import {Component, OnInit} from '@angular/core';
import {OptionsI} from "../../models/app.options.model";
import {TasksSandboxService} from "../../services/tasks-sandbox.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  implements OnInit{

  constructor(
    private taskSandbox: TasksSandboxService,

  ) { }

  ngOnInit() {
    this.onModelChange(this.options)
  }


  onModelChange(data: any) {
    this.options = data
    const categories = this.options.map(option => {
      if(option.active) {
        return option.title
      } else {
        return ''
      }
    })

    this.taskSandbox.selectCategories(categories)
  }

 options: OptionsI[] = [
   {title: 'home', active: true},
   {title: 'work', active: true},
   {title: 'party', active: true},
   {title: 'other', active: true},
 ]

}
