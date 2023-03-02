import { Component} from '@angular/core';
import { SearchRecipesService } from 'src/app/services/search-recipes.service';
import { firebase_service } from 'src/firebase/firebase.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})

export class PantryComponent{
  
  searchTerms:string [] =[];
  //searchTerms = ['Rice','Rice Grapes'];
  selectedItems = []; //selected from html form
  
  combinedRecipes: object [] = [];

  recipes: object [] = [];
  resultsCount = 0;

  filtered: object[] = [];

  firebaseReturn;
  pantryContents: object [] = [];
  meatContents;
  vegetableContents;
  grainContents;
  miscContents;
  fruitContents;
  dairyContents;

constructor(private router: Router, private searchRecipeService: SearchRecipesService) {  } 

selectRecipeComponents(){
  
}

//combines all selected terms together for sequential search where a term will be eleminated in each search
formatSearchTerms(){

  let formatTerms=[];
  let combinedTerm = "";

  for(let items in this.selectedItems)
  {
    formatTerms.push(this.selectedItems[items]);
  }

  for(let term in formatTerms){      
    combinedTerm = combinedTerm.concat(formatTerms[term]);
    combinedTerm += " ";
    this.searchTerms.push(combinedTerm);
  
  }
  this.searchPantryRecipes();
}


async retrievePantry(){
  this.firebaseReturn = await firebase_service.readCollection('users/9S4b90iYvqgswt2p0EBGWsfvO0k2/pantry');
 // console.log(JSON.stringify(this.firebaseReturn));
 // console.log(JSON.parse(JSON.stringify(this.firebaseReturn)));
  this.pantryContents = JSON.parse(JSON.stringify(this.firebaseReturn));
  this.meatContents = this.pantryContents[0];
  this.vegetableContents = this.pantryContents[1];
  this.grainContents = this.pantryContents[2];
  this.miscContents = this.pantryContents[3];
  this.fruitContents = this.pantryContents[4];
  this.dairyContents = this.pantryContents[5];

//  console.log(this.pantryContents);
  
}
  
async searchPantryRecipes(){    

  console.log("SELECTED SEARCH TERMS" + this.searchTerms);
  
  for(let i =this.searchTerms.length-1;i>=0; i--){

    console.log("i value" + i);
    console.log("RECIPE SEARCH TERM:" + this.searchTerms[i]);
         
    this.searchRecipeService.getRecipes(this.searchTerms[i]).subscribe(resp => {
      console.log("typeof searchterm " + typeof this.searchTerms[i]);
      console.log("CURRENT SEARCH TERM " +this.searchTerms[i]);
    this.resultsCount += resp.count;
    console.log("response count " + this.resultsCount);
    this.recipes = resp.results;
    console.log("api response " + JSON.stringify(resp.results));    

    this.compilationFilter();

    this.combinedRecipes = this.combinedRecipes.concat(this.recipes);
   

    console.log("RECIPES FOR THIS SEARCH TERM" + JSON.stringify(this.recipes));        
    console.log("COMBINBED RECIPES FOR ALL SEARCH TERMS" + JSON.stringify(this.combinedRecipes));

   
    })      
    console.log("EXIT SEARCH SERVICE");
    console.log("RECIPES VARIABLE VALUE" + JSON.stringify(this.recipes));
    
    //wait till all terms have been searched and results combined before displaying
    await this.searchRecipeService.sleep(3000);
    if(i==0){
      this.searchRecipeService.sharedRecipes = this.combinedRecipes;
      this.router.navigate(["recipes"]);

    } 

    //if results are 20 or greater exit search and display
    if(this.resultsCount >= 20) {
      this.searchRecipeService.sharedRecipes = this.combinedRecipes;
      this.router.navigate(["recipes"]);   

      break;}
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



}
