import {createAction, props} from '@ngrx/store';
import {Reference} from '@angular/fire/storage/interfaces';
import {FilesI} from "../../modules/file/models/app.files.model";

export const uploadFilesStart = createAction(
  '[Files] Upload Files Start',
  props<{ files: Reference[] }>()
);
export const uploadFilesSuccess = createAction(
  '[Files] Upload Files Success',
  props<{ files: Reference[] }>()
);
export const fetchFilesStart = createAction(
  '[Files] Fetch Files Start',
);
export const fetchFilesSuccess = createAction(
  '[Files] Fetch Files Success',
  props<{ files: FilesI[] }>()
);
