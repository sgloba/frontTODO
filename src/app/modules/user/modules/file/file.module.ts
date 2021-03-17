import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileInputButtonComponent} from './components/file-input-button/file-input-button.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {FileService} from './services/file.service';
import {FileStorageService} from './services/file-storage.service';
import {MaterialModule} from "../../../material/material.module";
import {FileRoutingModule} from "./file-routing.module";
import {AppCommonModule} from "../../../appCommon/appCommon.module";
import { ImgInputComponent } from './components/img-input/img-input.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        FileInputButtonComponent,
        FileUploadComponent,
        ImgInputComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FileRoutingModule,
        AppCommonModule,
        FormsModule,
    ],
  exports: [
    FileInputButtonComponent,
    ImgInputComponent
  ],
    providers: [
        FileService,
        FileStorageService,
    ]
})
export class FileModule { }
