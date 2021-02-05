import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, forkJoin} from 'rxjs';
import {map, catchError, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {fetchFilesStart, fetchFilesSuccess} from '../actions/files.actions';
import {FileStorageService} from '../../services/file-storage.service';


@Injectable()
export class FilesEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private fileStorage: FileStorageService,
  ) {
  }

  fetchFiles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchFilesStart.type),
    switchMap(() => this.fileStorage.getFiles$()
      .pipe(
        switchMap((files) => {
          return forkJoin(
            files.map((file) => this.fileStorage.getDownloadUrl$(file.name)
              .pipe(
                map((url) => ({name: file.name, url}))
              ))
          );
        }),
        map((files) => {
          return fetchFilesSuccess({files});
        }),
        catchError(() => EMPTY)
      )
    )
  ));
}
