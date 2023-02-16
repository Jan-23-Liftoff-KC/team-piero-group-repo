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
  filterTerms = [];
  //
  filterForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  //Creates the filter form on page initialization
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tags: this.fb.array([])
    })
   
  }

  callParentFilterResults(){
    this.filterEvent.emit();
    document.getElementById("overlay").style.display = "block";
    
    console.log(this.originalRecipes);
    console.log(this.apiTags);
    console.log(this.apiTags.results.length)


  };
  
  //Turns off the filter overlay if user clicks outside of the checkbox areas
  showFiltersOff() {
    document.getElementById("overlay").style.display = "none";
  }

  addFilterTerm(event) {
    event.stopPropagation();
    const checkArray: FormArray = this.filterForm.get('tags') as FormArray;

    if(event.target.checked){
      checkArray.push(new FormControl(event.target.value));
    }



    

    };

  checkSearchTerms() {};

}
