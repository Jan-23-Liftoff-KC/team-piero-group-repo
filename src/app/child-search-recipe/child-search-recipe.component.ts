import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as apiTags from 'src/assets/apiTags.json';
import { RecipesComponent } from '../recipes/recipes.component';


@Component({
  selector: 'child-search-recipe',
  templateUrl: './child-search-recipe.component.html',
  styleUrls: ['./child-search-recipe.component.scss']
})
export class ChildSearchRecipeComponent implements OnInit {

  @Output() filterEvent = new EventEmitter();
  @Input() originalRecipes;
  apiTags = apiTags;
  filterForm: FormGroup;
  filteredRecipes = [];
  //tagCategories object is used in template to display filters. Omitted unusual categories.
  tagCategories = {
    "name": [
      'cuisine', 'holiday', 'occasion', 'appliance', 'equipment',
      'dietary', 'difficulty', 'meal', 'seasonal', 'healthy'
    ],
    "display_name": [
      'Cuisine', 'Holiday', 'Occasion', 'Appliance', 'Equipment',
      'Dietary', 'Difficulty', 'Meal', 'Seasonal', 'Healthy'

    ]};



  constructor(private fb: FormBuilder, private recipeComponent: RecipesComponent) { 
  }

  //Creates the filter form on page initialization
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tags: this.fb.array([])
    })
   
  };


  //Turns on filter overlay when user clicks "Show Filters button"
  showFilters(){
    document.getElementById("overlay").style.display = "block";
  };
  

  //Turns off the filter overlay if user clicks outside of the checkbox areas
  showFiltersOff() {
    document.getElementById("overlay").style.display = "none";
  };


  //Keeps track of filters selected by the user and removes them if unselected. Selected filters stored
  //as "filterForm.value.tags"
  addFilterTerm(event) {
    const checkArray: FormArray = this.filterForm.get('tags') as FormArray;
    if(event.target.checked){
      checkArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    };
    console.log(this.filterForm.value.tags)
  };


  //Prevents click event from propagating to the overlay, which would then close the filter overlay.
  stopPropagation(event) {
    event.stopPropagation();
  };


  //Filters the list of recipes returned from the user's search based on the selected filters. Stores filtered
  //recipes in the filteredRecipes array.
  filterOriginalRecipes() {
    this.filteredRecipes = [];
    this.originalRecipes.forEach((recipe) => {
      if (this.filteredRecipes.includes(recipe)) {
        return this.filteredRecipes;
      } else if (this.filterForm.value.tags.every( function(activeTags) {
        let containsTag = false;
        for (let i = 0; i < recipe.tags.length-1; i++) {
          if (recipe.tags[i].name == activeTags) {
            return containsTag = true; 
          }
        };
        return containsTag
      })) {
        this.filteredRecipes.push(recipe)
      }
      return this.filteredRecipes
    });
    this.filterEvent.emit(this.filteredRecipes);    
  };


  //If Clear Filter button is selected, this function deselects all filters and any filter terms are reset to nothing. 
  clearFilterOptions () { 
    for (let tag of this.filterForm.value.tags) {
      let checkbox = document.getElementById(tag) as HTMLInputElement;
      checkbox.checked = false
    };
    const tags = this.filterForm.get('tags') as FormArray;
    if ( tags.length > 0 )  {
      tags.clear()
    };
    this.filterOriginalRecipes();
    this.recipeComponent.compilationFilter();
  };


};
