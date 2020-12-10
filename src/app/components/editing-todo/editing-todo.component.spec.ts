import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingTodoComponent } from './editing-todo.component';

describe('EditingTodoComponent', () => {
  let component: EditingTodoComponent;
  let fixture: ComponentFixture<EditingTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
