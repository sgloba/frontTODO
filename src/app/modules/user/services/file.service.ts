import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  icons = {
    txt: 'description',
    png: 'image',
    jpeg: 'image',
    jpg: 'image',
    gif: 'image',
  };

  getIcon(file): string {
    return this.icons[file.name.split('.').pop()];
  }


}
