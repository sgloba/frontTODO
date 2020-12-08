import {getTestBed, TestBed} from '@angular/core/testing';

import { HttpService } from './http.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TodoI} from "../models/app.todo.model";
import {of} from "rxjs";

const TEST_TODOS = [
  {
    _id: '5fcf1c4212bdb4154fe9e5d0',
    value: 'test_todo',
    timestamp: 124,
    isCompleted: false
  }
]

const MOCKED_HTTP_SERVICE = {
  get: () => of(TEST_TODOS)
}

describe('HttpService', () => {
  let injector: TestBed;
  let http = HttpClient
  let service : HttpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: MOCKED_HTTP_SERVICE }
      ]
    });
    injector = getTestBed();
    service = TestBed.inject(HttpService);
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
