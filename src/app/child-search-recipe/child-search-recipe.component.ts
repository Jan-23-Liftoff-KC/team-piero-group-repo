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
  filteredRecipes;
  apiTags = apiTags;
  tagCategories = [
    'cuisine',       'holiday',
    'cooking_style', 'occasion',
    'appliance',     'equipment',
    'business_tags', 'dietary',
    'feature_page',  'difficulty',
    'meal',          'seasonal',
    'healthy',       'seo'
  ]
  filterTerms = [];
  filterForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  //Creates the filter form on page initialization
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tags: this.fb.array([])
    })
   
  }

  callParentFilterResults(){
    document.getElementById("overlay").style.display = "block";
    
    // console.log(this.originalRecipes);
    // console.log(this.apiTags);
    // console.log(this.apiTags.results.length)


  };
  
  //Turns off the filter overlay if user clicks outside of the checkbox areas
  showFiltersOff() {
    document.getElementById("overlay").style.display = "none";
  }

  //addFilterTerm function called when users select a filter checkbox. Function adds the checkbox value to the tags array found under 
  //filterForm.value.tags. Function also removes tags if the user unchecks a filter box. 
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

    // console.log(this.filterForm);
    console.log(this.filterForm.value.tags)
  };

  //Prevents click event from propagating to the overlay, which would then close the filter overlay.
  stopPropagation(event) {
    event.stopPropagation();
  };

  filterOriginalRecipes() {
    this.filterEvent.emit();

  };

}
