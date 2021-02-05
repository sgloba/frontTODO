import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FilesState} from '../reducers/files.reducer';

const filesState = createFeatureSelector<FilesState>('files');

export const allFiles = createSelector(
  filesState,
  ({files}) => files
);

