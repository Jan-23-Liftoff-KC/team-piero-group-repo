import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { RootObject, Result } from 'src/app/interfaces/recipes';



@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})

export class SearchRecipeComponent {

  recipes;
  resultsCount;

  // Still need to decide on a way to handle the complicated hierarchy of recipe JSON. Difficult
  // to pull out the recipe and the ingredients needed. 
  ingredients = [];
  recipeSearchTerm;
  fetchResponse;
  display = false;
  instructions;


  constructor(private searchRecipeService: SearchRecipesService) {  } 
  

  onSubmit() {
    this.searchRecipeService.getRecipes(this.recipeSearchTerm)
      .subscribe(resp => {
        this.resultsCount = resp.count;
        this.recipes = resp.results;

      console.log(this.recipeSearchTerm)
      console.log(this.recipes)
      })
    };

  showInstructions(selected):void{
    this.display = true;    
    this.instructions = selected['instructions'];
  }


  };