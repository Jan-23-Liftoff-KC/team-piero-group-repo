import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as apiTags from 'src/assets/apiTags.json';


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
  // tagCategories = [
  //   'cuisine',       'holiday',
  //   'cooking_style', 'occasion',
  //   'appliance',     'equipment',
  //   'business_tags', 'dietary',
  //   'feature_page',  'difficulty',
  //   'meal',          'seasonal',
  //   'healthy',       'seo'
  // ];



  constructor(private fb: FormBuilder) { }

  //Creates the filter form on page initialization
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tags: this.fb.array([])
    })
   
  }

  //Turns on filter overlay when user clicks "Show Filters button"
  showFilters(){
    document.getElementById("overlay").style.display = "block";
  };
  
  //Turns off the filter overlay if user clicks outside of the checkbox areas
  showFiltersOff() {
    document.getElementById("overlay").style.display = "none";
  }

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

    console.log(this.originalRecipes);
    console.log(this.filterForm.value.tags)
    console.log(this.originalRecipes[0].tags.length)
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
      }
      else if (this.filterForm.value.tags.every( function(activeTags) {
      
        let containsTag = false;

        for (let i = 0; i < recipe.tags.length-1; i++) {
          if (recipe.tags[i].name == activeTags) {
            console.log(activeTags)
            return containsTag = true; 
        }};
        return containsTag
      })) {
        this.filteredRecipes.push(recipe)
      }
    
      return this.filteredRecipes
    });


    console.log(this.filteredRecipes);

    // this.filterEvent.emit();    
    // console.log(this.filteredRecipes)
  };


};
