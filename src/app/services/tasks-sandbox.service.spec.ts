import { TestBed } from '@angular/core/testing';

import { TasksSandboxService } from './tasks-sandbox.service';
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {HttpService} from "./http.service";
import {TodoI} from "../models/app.todo.model";

describe('TasksSandboxService', () => {
  let service: TasksSandboxService;
  let http: HttpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TasksSandboxService);

  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should call request correctly()', () => {
  //   const TEST_TODOS = [
  //     { _id: 1, value: 'First todo', timestamp: +new Date(), isCompleted: false }
  //   ] as TodoI[];
  //   spyOn(http, 'getTodos').and.returnValue(of(TEST_TODOS));
  //   service.request();
  //   // expect(http.getTodos).toHaveBeenCalled();
  // })
});
