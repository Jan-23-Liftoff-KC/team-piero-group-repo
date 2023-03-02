import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPantryComponent } from './edit-pantry.component';

describe('EditPantryComponent', () => {
  let component: EditPantryComponent;
  let fixture: ComponentFixture<EditPantryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPantryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
