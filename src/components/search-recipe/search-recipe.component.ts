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
  subscription: Object = null;
  recipes;
  ingredients = [];

  constructor(private searchRecipeService: SearchRecipesService) {  } 
  

  onSubmit() {
    this.subscription = this.searchRecipeService.getRecipes()
      .subscribe(resp => {
        this.fullResponse = resp;
        this.recipes = this.fullResponse.results;

        
        // for (let i = 0; i = this.recipes.length; i++) {
        //   let ingredientsList = {};
        //     for (let j = 0; j = this.recipes.sections[j].components.length)


            // result[0].sections[0].components[0].ingredient.name



        }

      // }
      )
    };

};




    // this.searchRecipeService.getRecipes();

      // .subscribe(
      //   (resp => {
      //     this.fullResponse = resp;
      //     console.log(this.fullResponse);

      //     return this.fullResponse
      //   })
      // );

    // console.log(this.recipes);
    // console.log(typeof (this.fullResponse))
    // console.log(this.fullResponse);


    // this.fullResponse = this.searchRecipeService.getRecipes();
          // this.fullResponse



  // onSubmit() {

  //   this.searchRecipeService.getRecipes()
  //     .subscribe( 
  //       (resp: RootObject[]) => {
  //         this.fullResponse = resp;
  //         // this.fullResponse
  //         console.log(this.fullResponse);

  //         return this.fullResponse

  //       })
    
  //   console.log(this.fullResponse);
  //   console.log(typeof(this.fullResponse))
  // };