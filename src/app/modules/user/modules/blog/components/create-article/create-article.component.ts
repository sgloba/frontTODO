import {Component, ViewChild} from '@angular/core';
import * as ckEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpBlogService} from "../../services/http-blog.service";
import {ToastrService} from "ngx-toastr";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
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
  fileImg: File[];
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
    if (this.preview?.length > 200) {
      this.toast.error('Preview must be 200 characters max');
      return;
    }
    if (this.title.length > 40) {
      this.toast.error('Title must be 40 characters max');
      return;
    }
    if(this.fileImg === [] || !this.fileImg) {
      this.toast.error('Image file required');
      return;
    }
    const data = {
      title: [{lang: this.lang, content: this.title}],
      body: [{lang: this.lang, content: this.edit.editorInstance.getData()}],
      preview: this.preview
        ? [{lang: this.lang, content: this.preview}]
        : [],
      tags: this.tags || [],
      fileImg: this.fileImg || []
    };
    this.httpBlog.createArticle$(data).subscribe();
    this.clearForm();
  }

  clearForm(): void {
    this.preview = '';
    this.title = '';
    this.edit.editorInstance.setData('');
    this.tags = [];
    this.fileImg = [];
  }

}
