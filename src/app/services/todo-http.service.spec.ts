import {getTestBed, TestBed} from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TodoI} from "../models/app.todo.model";
import {of} from "rxjs";

const TEST_TODOS = [
  {
    _id: 5465465465465,
    value: 'test_todo',
    timestamp: 124,
    isCompleted: false
  }
]

const MOCKED_TODO_HTTP_SERVICE = {
  get: () => of(TEST_TODOS)
}

describe('TodoHttpService', () => {
  let injector: TestBed;
  let http = HttpClient
  let service : TodoHttpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: MOCKED_TODO_HTTP_SERVICE }
      ]
    });
    injector = getTestBed();
    service = TestBed.inject(TodoHttpService);
    http = injector.get(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos on getTodos() method', async function () {
    spyOn<any>(http, 'get').and.callThrough();
    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(TEST_TODOS)
      expect((http as any).get).toHaveBeenCalledWith(service.url);
    })
  });
});
