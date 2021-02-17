import {createReducer, on} from '@ngrx/store';
import * as FilesAction from '../actions/files.actions';
import {FilesI} from '../../modules/file/models/app.files.model';

export interface FilesState {
  files: FilesI[];
}

export const initialState: FilesState = {
  files: [],
};

export const filesReducer = createReducer(
  initialState,
  on(FilesAction.fetchFilesSuccess,
    (state, {files}) => {
    return ({...state, files});
    }
  )
);
