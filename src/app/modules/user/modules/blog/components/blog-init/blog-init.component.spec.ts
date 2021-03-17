import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogInitComponent } from './blog-init.component';

describe('BlogInitComponent', () => {
  let component: BlogInitComponent;
  let fixture: ComponentFixture<BlogInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
