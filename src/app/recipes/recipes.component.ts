import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import {  Router, RouterModule, Routes, Route } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  // templateUrl: 'src/app/recipes/recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit{

  recipes;
  recipesString;
  resultsCount;

  // Further dev: Still need to decide on a way to handle the complicated hierarchy of recipe JSON. Difficult
  // to pull out the ingredients from each recipe because it is nested so deep in the object.
  recipeSearchTerm;
  display = false;
  instructions: object [];
  ingredients: object [];
  sections: object [];  
  components: object [] = [];  
  filtered: object[] = [];
  storedRecipes;
  thumbnailURL;

  //Creates a private instance of the searchRecipeService for use in this component
  constructor(private searchRecipeService: SearchRecipesService){} 
  
  ngOnInit() {
    this.recipes = this.searchRecipeService.sharedRecipes;
   }
 
  //Function to query the API when the user submits a search term by clicking submit, or pressing 'Enter' key
  //The function assigns the returned recipes to the 'recipes' variable on line 15
  
  onSubmit() { 
    
    this.searchRecipeService.getRecipes(this.recipeSearchTerm)
      .subscribe(resp => {
        this.resultsCount = resp.count;
        this.recipes = resp.results;
        this.storedRecipes = resp.results;  


        this.recipesString = JSON.stringify(this.recipes); //results are stringifyed then parsed to create iterable list for compilationFilter
        this.recipes = JSON.parse(this.recipesString);        
        this.compilationFilter();
      })

      this.compilationFilter();

      this.display = false;
    }


  //remove all compilation recipes to improve relevance of search results
  compilationFilter():void{

    console.log(this.recipes);
    
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

  //Function called when a user clicks a recipe name in the html view. Assigns the recipe instructions from the 
  //API response to the "instructions" array on line 24, which is then displayed by the loop in html file, line 19.
  instructionAndIngredientFunction(selected):void{
    this.display = true;    
    this.instructions = selected['instructions'];
    this.sections = selected['sections'];
    this.thumbnailURL = selected['thumbnail_url'];
    this.components = [];
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

  filterResults(filteredRecipes) {
    this.recipes = filteredRecipes;
  }

  }
  

  