import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {TodoI} from '../../models/app.todo.model';

const TEST_TODO: TodoI = {
  _id: 5465465465465,
  value: 'test_todo',
  timestamp: 124,
  isCompleted: false
};

describe(`Component: todo-item`, () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let toggleSpanEditableBtn: DebugElement;
  let removeTodoBtn: DebugElement;
  let toggleActiveBtn: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [
        HttpClientModule,
      ]
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    toggleSpanEditableBtn = fixture.debugElement.query(By.css('.btn-wrap :first-child'));
    removeTodoBtn = fixture.debugElement.query(By.css('.btn-wrap button:last-of-type'));
    toggleActiveBtn = fixture.debugElement.query(By.css('.toggle-active'));
    fixture.detectChanges();
  }));

  beforeEach(() => {
    component.todo = TEST_TODO;
    fixture.detectChanges();
  });


  it('expect allowEdit to be false', () => {
    expect(component.allowEdit).toBeFalse();
  });


  // toggleSpanEditable button
  it('should call toggleSpanEditable on edit button click', () => {
    spyOn(component, 'toggleSpanEditable').and.callThrough();
    toggleSpanEditableBtn.nativeElement.click();
    expect(component.toggleSpanEditable).toHaveBeenCalled();
  });

  it('toggleSpanEditable should change allowEdit to true',  () => {
    spyOn(component, 'toggleSpanEditable').and.callThrough();
    toggleSpanEditableBtn.nativeElement.click();
    expect(component.allowEdit).toBeTrue();
  });

  // removeTodo button
  it('should call removeTodo on remove button click',  () => {
    spyOn(component, 'removeTodo').and.callThrough();
    removeTodoBtn.nativeElement.click();
    expect(component.removeTodo).toHaveBeenCalled();
  });

  // toggleActive button
  it('should call toggleActive on toggleActive button click', () => {
    spyOn(component, 'toggleActive').and.callThrough();
    toggleActiveBtn.nativeElement.click();
    expect(component.toggleActive).toHaveBeenCalledWith(TEST_TODO._id);
  });

});


