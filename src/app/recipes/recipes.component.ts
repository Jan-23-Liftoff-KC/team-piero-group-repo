import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
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
  ingredients: object [];

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
       //remove all compilation recipes to improve relevance of search results
      }
      else{
   
        this.filtered.push(entry);
      }
    }
    this.recipes = this.filtered;  
  }

  instructionAndIngredientFunction(selected):void{
    this.display = true;    
    this.instructions = selected['instructions'];
    this.ingredients = selected['sections'][0]['components'];


  }  
}
