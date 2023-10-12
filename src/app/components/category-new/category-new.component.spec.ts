import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNewComponent } from './category-new.component';

describe('CategoryNewComponent', () => {
  let component: CategoryNewComponent;
  let fixture: ComponentFixture<CategoryNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryNewComponent]
    });
    fixture = TestBed.createComponent(CategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
