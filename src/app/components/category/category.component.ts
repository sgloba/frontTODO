import {Component} from '@angular/core';
import {OptionsI} from "../../models/app.options.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  constructor() { }




  optionsChange(opt) {
    this.options = opt
    console.log(this.options)
  }

 options: OptionsI[] = [
   {title: 'home', active: true},
   {title: 'work', active: false},
   {title: 'party', active: true},
   {title: 'other', active: false},
 ]
}
