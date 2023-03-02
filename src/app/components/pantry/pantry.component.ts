import { Component, OnInit} from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { firebase_service } from 'src/firebase/firebase.service';
import {  Router } from '@angular/router';
import { User } from 'firebase/auth';
import { auth } from 'src/firebase/firebase.init';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})

export class PantryComponent {

  searchTerms: string[] = [];  //formatted search terms derived from selected pantry ingredients
  selectedItems = []; //selected from html form

  combinedRecipes: object[] = []; //combined list of recipes for all pantry ingredient searches

  recipes: object[] = [];//List of recipes from each api search
  resultsCount = 0; //sum of all results from tastyAPI

  filtered: object[] = []; //used in compilationFilter function

  firebaseReturn;//stores returned firebase pantry contents
  pantryContents: object[] = []; //stringifyed then parsed firebaseReturn object
  meatContents;//arrays containing all objects in each ingredient category
  vegetableContents;
  grainContents;
  miscContents;
  fruitContents;
  dairyContents;

  user: User = null;
  user_id: string = null;

  constructor(private router: Router, private searchRecipeService: SearchRecipesService) { }

ngOnInit(): void {
  auth.onAuthStateChanged(user => {
    if(user) {
      this.user = user;
      this.user_id = user.uid;
    }
  });
}

  //combines all selected terms together for sequential search where a term will be eleminated in each search
  formatSearchTerms() {

    let formatTerms = [];
    let combinedTerm = "";

    for (let items in this.selectedItems) {
      formatTerms.push(this.selectedItems[items]);
    }

    for (let term in formatTerms) {     //selected ingredients are combined into single search terms, higher priority ingredients have a lower index in the array
      combinedTerm = combinedTerm.concat(formatTerms[term]);
      combinedTerm += " ";//leading spaces seem to break api search function
      this.searchTerms.push(combinedTerm);

    }
    this.searchPantryRecipes();
  };

  async retrievePantry() {
    this.firebaseReturn = await firebase_service.readCollection(`users/${this.user_id}/pantry`);
    this.pantryContents = JSON.parse(JSON.stringify(this.firebaseReturn)); //stringify and parse to avoid errors in browser regarding non-interable variables
    this.meatContents = this.pantryContents['meat'].map(x => this.toTitleCase(x));
    this.vegetableContents = this.pantryContents['vegetable'].map(x => this.toTitleCase(x));
    this.grainContents = this.pantryContents['grain'].map(x => this.toTitleCase(x));
    this.miscContents = this.pantryContents['misc'].map(x => this.toTitleCase(x));
    this.fruitContents = this.pantryContents['fruit'].map(x => this.toTitleCase(x));
    this.dairyContents = this.pantryContents['dairy'].map(x => this.toTitleCase(x));
  };
  
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };



  async searchPantryRecipes() {

    for (let i = this.searchTerms.length - 1; i >= 0; i--) {

      //the search terms start with the most specific and progress to the most general.Continues until at least 20 results are found or all terms are searched
      this.searchRecipeService.getRecipes(this.searchTerms[i]).subscribe(resp => {
        this.resultsCount += resp.count;
        this.recipes = resp.results;

        this.compilationFilter();

        this.combinedRecipes = this.combinedRecipes.concat(this.recipes);//each search terms recipes are combined into a single list for display

      })
      //wait till all terms have been searched and results combined before displaying
      await this.searchRecipeService.sleep(1500);
      if (i == 0) {
        this.searchRecipeService.sharedRecipes = this.combinedRecipes;//Finished list is pushed to searchRecipeService then accessed with recipes.component.ts
        this.router.navigate(["recipes"]);//redirect to the recipes page for display of combinedRecipes
      }

      //if results are 20 or greater exit search and display
      if (this.resultsCount >= 20) {
        this.searchRecipeService.sharedRecipes = this.combinedRecipes; //Finished list is pushed to searchRecipeService then accessed with recipes.component.ts
        this.router.navigate(["recipes"]); this.router.navigate(["recipes"]);//redirect to the recipes page for display of combinedRecipes

        break; //exit loop is results count condition has been met
      }
    }
  };

  //remove all compilation recipes to improve relevance of search results
  compilationFilter(): void {
    this.filtered = [];  // not redundant, reset recipes list between searches  
    for (let entry of this.recipes) {
      if (entry['canonical_id'].includes('compilation')) {
      }
      else {
        this.filtered.push(entry);
      }
    }
    this.recipes = this.filtered;
  };

  routeToEditPantry() {
    this.router.navigate(["pantry/edit-pantry"]);
  };

}
