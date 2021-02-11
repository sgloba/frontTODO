import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileInputButtonComponent} from './components/file-input-button/file-input-button.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {FileService} from './services/file.service';
import {FileStorageService} from './services/file-storage.service';
import {MaterialModule} from "../../../material/material.module";
import {FileRoutingModule} from "./file-routing.module";



@NgModule({
  declarations: [
    FileInputButtonComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FileRoutingModule,
  ],
  providers: [
    FileService,
    FileStorageService,
  ]
})
export class FileModule { }
