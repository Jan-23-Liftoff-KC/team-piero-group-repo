import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'src/firebase/firebase.init';
import { User } from "firebase/auth";
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { RootObject, Result } from 'src/app/interfaces/recipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
 
export class HomeComponent implements OnInit {

  user: User = null;

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
  thumbnailURL: object[];
  recipeName: object[];
  yieldAmount: object[];
  cookTime: object[];
  prepTime: object[];
  

  //Creates a private instance of the searchRecipeService for use in this component
  constructor(private searchRecipeService: SearchRecipesService, private matSnackBar: MatSnackBar, private router: Router) {  } 

  // Obserable that keeps track of user status (login/logout)
  ngOnInit(): void {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        this.user = user;
      } else {
        console.log("no user logged in");
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

        this.recipesString = JSON.stringify(this.recipes); //results are stringifyed then parsed to create iterable list for compilationFilter
        this.recipes = JSON.parse(this.recipesString);        
        this.compilationFilter();
      })

      this.display = false;
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

  //Function called when a user clicks a recipe name in the html view. Assigns the recipe instructions from the 
  //API response to the "instructions" array on line 24, which is then displayed by the loop in html file, line 19.
  instructionAndIngredientFunction(selected):void{
    this.display = true;    
    this.recipeName = selected['name'];
    this.instructions = selected['instructions'];
    this.sections = selected['sections'];
    this.components = [];
    this.sectionDisplay();
    this.thumbnailURL = selected['thumbnail_url']; 
    this.yieldAmount = selected['yields']; 
    this.cookTime = selected['cook_time_minutes'];
    this.prepTime = selected['prep_time_minutes'];
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

  signOut() {
    if(this.user) {
      auth.signOut().catch((err) => console.log(err));
      this.matSnackBar.open("signed out successfully", "CLOSE");
      this.router.navigate([""]);
    }
    
  }

}
