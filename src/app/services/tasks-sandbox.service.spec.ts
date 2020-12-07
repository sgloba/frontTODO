import { TestBed } from '@angular/core/testing';

import { TasksSandboxService } from './tasks-sandbox.service';

describe('TasksSandboxService', () => {
  let service: TasksSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
