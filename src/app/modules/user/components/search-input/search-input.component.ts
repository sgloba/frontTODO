import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {fromEvent, combineLatest, forkJoin} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {MatMenuTrigger} from '@angular/material/menu';
import {TodoI} from '../../models/app.todo.model';
import {TasksSandboxService} from '../../services/tasks-sandbox.service';
import {FileStorageService} from '../../services/file-storage.service';
import {TodoHttpService} from '../../services/todo-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(): void {
    this.menuTrigger.closeMenu();
  }

  constructor(
    private store: Store,
    private taskSandbox: TasksSandboxService,
    private todoHttp: TodoHttpService,
    private fileStorage: FileStorageService,
    private route: Router,
  ) {
  }

  searchResultsFiles: any[];
  searchResultsTodos: TodoI[];
  searchResultsUrls: any;


  ngAfterViewInit(): void {
    // Invoke search, send request to server, then maps file url/name and todos value/id to view
    // All this is because firestorage don't send urls with files and u need to use getDownloadUrl$
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchQuery: string) => {
          const files$ = this.fileStorage.getFilesByQuery$(searchQuery)
            .pipe(
              switchMap((files) => {
                return forkJoin(
                  files.map((file) => {
                    return this.fileStorage.getDownloadUrl$(file.name).pipe(
                      map((url) => {
                        return ({url, name: file.name});
                      })
                    );
                  })
                );
              })
            );
          const todos$ = this.todoHttp.getTodosBySearchQuery(searchQuery);
          return combineLatest([files$, todos$]);
        })
      )
      .subscribe(([files, todos]) => {
        this.menuTrigger.openMenu();
        this.searchResultsFiles = files;
        this.searchResultsTodos = todos;
      });
  }

  openSearchMenu(): void {
    if ((!!this.searchResultsFiles || !!this.searchResultsTodos) && this.menuTrigger.menuClosed) {
      this.menuTrigger.openMenu();
    }
  }

  gotoTodo(id): void {
    this.route.navigate(
      ['/main'],
      {
        queryParams: {todo: id},
        queryParamsHandling: 'merge'
      });
  }
  openFile(url): void {
    window.open(url);
  }
}
