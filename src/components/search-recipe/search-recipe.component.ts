import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from 'src/services/search-recipes.service';
import { RootObject, Result } from 'src/interfaces/recipes';



@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})

export class SearchRecipeComponent {

  fullResponse: RootObject;
  subscription: Object;
  recipes;
  ingredients = [];
  recipeSearchTerm;
  fetchResponse;

  constructor(private searchRecipeService: SearchRecipesService) {  } 
  

  onSubmit() {
    this.subscription = this.searchRecipeService.getRecipes(this.recipeSearchTerm)
      .subscribe(resp => {
        this.fullResponse = resp;
        this.recipes = this.fullResponse.results;

      console.log(this.recipeSearchTerm)
      console.log(this.recipes)
      })
    };


  };