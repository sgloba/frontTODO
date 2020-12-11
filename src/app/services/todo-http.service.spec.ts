import {getTestBed, TestBed} from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('TodoHttpService', () => {
  let injector: TestBed;
  let service: TodoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    injector = getTestBed();
    service = TestBed.inject(TodoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
