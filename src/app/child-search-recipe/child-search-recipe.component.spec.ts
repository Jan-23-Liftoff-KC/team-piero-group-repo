import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSearchRecipeComponent } from './child-search-recipe.component';

describe('ChildSearchRecipeComponent', () => {
  let component: ChildSearchRecipeComponent;
  let fixture: ComponentFixture<ChildSearchRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildSearchRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSearchRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
