import { Component, OnInit } from '@angular/core';
import { ChildSearchRecipeComponent } from '../child-search-recipe/child-search-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  // templateUrl: 'src/app/recipes/recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {


  returnJSON: object;
  fetchTest: object;
  recipes: object[];
  filtered:object[] = [];
  display:boolean = false;

  selected:object;  
  instructions: object [];

  options: object = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '47c620be6bmshcd09d2f02d1bf5dp14967ejsnbe17a2cc0cc9',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'    }
    };

  constructor() { }

  ngOnInit(): void {
  }

  async search(searchTerm:string):Promise<void>{
    this.fetchTest = await fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=' + searchTerm, this.options).then(function(response){
      return response.json();})
  
  this.returnJSON = JSON.parse(JSON.stringify(this.fetchTest)); 
  this.compilationFilter();  
  this.display = false;
  }
  
  compilationFilter():void{ 
  
    this.filtered = [];  // not redundant
  
    for(let entry of this.returnJSON['results']){
  
      if(entry['canonical_id'].includes('compilation'))
      {      
        for(let part of entry['recipes'])
        {
          this.filtered.push(part);
        }
      }
      else{
   
        this.filtered.push(entry);
      }
    }
    this.recipes = this.filtered;  
  }

  instructionFunction(selected):void{
    this.display = true;    
    this.instructions = selected['instructions'];
  }

  filterResults() {
    console.log("filterEvent has occurred.")
  };
}
