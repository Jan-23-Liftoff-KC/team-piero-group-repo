import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { RootObject, Result } from 'src/app/interfaces/recipes';



@Component({
  selector: 'search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})

export class SearchRecipeComponent {

  recipes;
  resultsCount;

  // Further dev: Still need to decide on a way to handle the complicated hierarchy of recipe JSON. Difficult
  // to pull out the ingredients from each recipe because it is nested so deep in the object.
  ingredients = [];
  recipeSearchTerm;
  fetchResponse;
  display = false;
  instructions;

  //Creates a private instance of the searchRecipeService for use in this component
  constructor(private searchRecipeService: SearchRecipesService) {  } 
  
  //Function to query the API when the user submits a search term by clicking submit, or pressing 'Enter' key
  //The function assigns the returned recipes to the 'recipes' variable on line 15
  onSubmit() {
    this.searchRecipeService.getRecipes(this.recipeSearchTerm)
      .subscribe(resp => {
        this.resultsCount = resp.count;
        this.recipes = resp.results;

      console.log(this.recipeSearchTerm)
      console.log(this.recipes)
      })
    };

  //Function called when a user clicks a recipe name in the html view. Assigns the recipe instructions from the 
  //API response to the "instructions" array on line 24, which is then displayed by the loop in html file, line 19.
  showInstructions(selected):void{
    this.display = true;    
    this.instructions = selected['instructions'];
  }


  };