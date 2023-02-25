import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRecipeCardComponent } from './small-recipe-card.component';

describe('SmallRecipeCardComponent', () => {
  let component: SmallRecipeCardComponent;
  let fixture: ComponentFixture<SmallRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallRecipeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
