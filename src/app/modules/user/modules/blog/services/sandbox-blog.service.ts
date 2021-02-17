import { Injectable } from '@angular/core';
import {setMarkStart} from "../../../store/actions/articles.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class SandboxBlogService {

  constructor(
    private store: Store
  ) { }

  setArticleMarks(id, mark): void{
    this.store.dispatch(setMarkStart({id, mark}));
  }
}
