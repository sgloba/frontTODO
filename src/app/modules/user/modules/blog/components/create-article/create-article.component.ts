import {Component, ViewChild} from '@angular/core';
import * as ckEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpBlogService} from "../../services/http-blog.service";
import {ToastrService} from "ngx-toastr";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  constructor(
    private httpBlog: HttpBlogService,
    private toast: ToastrService,
  ) {
  }

  editor = ckEditor;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [];
  title: string;
  preview: string;
  lang: string = window.navigator.language.substring(0, 2);
  @ViewChild('edit') edit: any;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  submit(): void {
    if (!this.edit.editorInstance.getData() || !this.title) {
      this.toast.error('Title and Body required');
      return;
    }
    const data = {
      title: [{lang: this.lang, content: this.title}],
      body: [{lang: this.lang, content: this.edit.editorInstance.getData()}],
      preview: this.preview
        ? [{lang: this.lang, content: this.preview}]
        : [],
      tags: this.tags ? this.tags : []
    };
    this.httpBlog.createArticle$(data).subscribe();
    this.clearForm();
  }

  clearForm(): void {
    this.preview = '';
    this.title = '';
    this.edit.editorInstance.setData('');
    this.tags = [];
  }

  f() {
    console.log(window.navigator.language.substring(0, 2))
  }
}
