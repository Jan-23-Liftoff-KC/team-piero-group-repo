import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { User } from 'firebase/auth';
import { auth } from 'src/firebase/firebase.init';

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
  thumbnailURL: object[];
  recipeName: object[];
  yieldAmount: object[];
  cookTime: object[];
  prepTime: object[];
  

  user: User = null;
  user_id: string = null;

  //Creates a private instance of the searchRecipeService for use in this component
  constructor(private searchRecipeService: SearchRecipesService){} 
  
  ngOnInit(): void {
    this.recipes = this.searchRecipeService.sharedRecipes; //check for shared combinedRecipes from pantry.component to display

    auth.onAuthStateChanged(user => {
      if(user) {
        this.user = user;
        this.user_id = user.uid;
      }
    });
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
      {//compilations are removed
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
    this.recipeName = selected['name'];
    this.instructions = selected['instructions'];
    this.sections = selected['sections'];
    this.thumbnailURL = selected['thumbnail_url'];
    this.components = [];
    this.sectionDisplay();
    this.thumbnailURL = selected['thumbnail_url']; 
    this.yieldAmount = selected['yields']; 
    this.cookTime = selected['cook_time_minutes'];
    this.prepTime = selected['prep_time_minutes'];
  }  

  //function to retrieve all ingredients from nested JSON object
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
  

  