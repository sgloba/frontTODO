import { TestBed } from '@angular/core/testing';

import { TasksSandboxService } from './tasks-sandbox.service';
import {HttpClientModule} from '@angular/common/http';

describe('TasksSandboxService', () => {
  let service: TasksSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TasksSandboxService);

  });

});
