import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingActionBtnsComponent } from './floating-action-btns.component';

describe('FloatingActionBtnsComponent', () => {
  let component: FloatingActionBtnsComponent;
  let fixture: ComponentFixture<FloatingActionBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingActionBtnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
