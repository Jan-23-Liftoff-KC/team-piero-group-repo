import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { firebase_service } from 'src/firebase/firebase.service';
import { RecipesComponent } from '../../recipes/recipes.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent{
  
  pantryRecipes;
  selectedItems  = ['tapioca','steak'];
  combinedRecipes: object [] = [];
  firebaseReturn;
  pantryContents: object [] = [];  
  pantryContentsString;
  //selectedItems; 

  recipes: object [] = [];
  resultsCount = 0;

  recipeSearchTerm = '';
  display = false;
  recipesDisplay = false;


  instructions: object [];
  ingredients: object [];
  sections: object [];  
  components: object [] = [];  
  filtered: object[] = [];


  constructor(private searchRecipeService: SearchRecipesService) {  } 

selectRecipeComponents(){
  
}


async retrievePantry(){
  this.firebaseReturn = await firebase_service.readCollection('Pantry');
  console.log(JSON.stringify(this.firebaseReturn));
  console.log(JSON.parse(JSON.stringify(this.firebaseReturn)));
  this.pantryContents = JSON.parse(JSON.stringify(this.firebaseReturn));
  console.log(this.pantryContents);
}
  
async searchPantryRecipes(){    

  this.retrievePantry();

  for(let i =this.selectedItems.length-1;i>=0; i--){
   this.recipeSearchTerm = this.selectedItems[i];  

    console.log("i value" + i);
    console.log("RECIPE SEARCH TERM:" + this.recipeSearchTerm);
         
    this.searchRecipeService.getRecipes(this.recipeSearchTerm).subscribe(resp => {
    this.resultsCount += resp.count;
    console.log(this.resultsCount);
    this.recipes = resp.results;
   

    this.compilationFilter();

    this.combinedRecipes = this.combinedRecipes.concat(this.recipes);
   

    console.log("RECIPES FOR THIS SEARCH TERM" + JSON.stringify(this.recipes));        
    console.log("COMBINBED RECIPES FOR ALL SEARCH TERMS" + JSON.stringify(this.combinedRecipes));

   
    })      


    console.log("EXIT SEARCH SERVICE");
    console.log("RECIPES VARIABLE VALUE" + JSON.stringify(this.recipes));

    await this.searchRecipeService.sleep(3000);
    if(i==0){this.recipesDisplay = true;}; //wait till all terms have been searched and results combined before displaying
    if(this.resultsCount >= 20) {this.recipesDisplay = true; break;}//if results are 20 or greater exit search
    }



      console.log("EXIT LOOP");
      console.log("COMBINBED RECIPES FOR ALL SEARCH TERMS" + JSON.stringify(this.combinedRecipes));
  }

 
//remove all compilation recipes to improve relevance of search results
compilationFilter():void{        
  this.filtered = [];  // not redundant, reset recipes list between searches  
  for(let entry of this.recipes){  
    if(entry['canonical_id'].includes('compilation'))
    {      
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
    this.sections = selected['sections'];
    this.components = [];
    console.log("instructionandIngredientFunction " + JSON.stringify(selected));
    this.sectionDisplay();
  }  

  sectionDisplay():void{   
    for(let section of this.sections)
    {
      let components: object [] = section['components'];
      for(let component of components){
        this.components.push(component);
      }
    }   
  }  

}
