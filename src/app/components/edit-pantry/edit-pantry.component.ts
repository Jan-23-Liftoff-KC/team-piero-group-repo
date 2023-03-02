import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firebase_service } from 'src/firebase/firebase.service';
import {  Router } from '@angular/router';
import { getTrailingCommentRanges } from 'typescript';



@Component({
  selector: 'edit-pantry',
  templateUrl: './edit-pantry.component.html',
  styleUrls: ['./edit-pantry.component.scss']
})
export class EditPantryComponent implements OnInit {

  pantrySearchTerm = '';
  pantrySearchCategory = '';
  pantryCategories = ['Meat', 'Vegetable', 'Grain', 'Misc', 'Fruit', 'Dairy']
  selectedCategory;
  ingredients;
  pantryCollection;

  constructor(private http: HttpClient, private router: Router) { }

  headers = new HttpHeaders({
    'X-RapidAPI-Key': '7c74d55e43msh895d92d3174837fp19733djsn47065daa1688',
    'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
  });

  getRecipes() {
    console.log('Pantry Search Activated');
    
    this.http.get('https://yummly2.p.rapidapi.com/feeds/auto-complete', {
      headers: this.headers,
      params: new HttpParams()
        .set("q", this.pantrySearchTerm)
    })
      .subscribe(resp =>
        this.ingredients = resp['ingredients']
      );
  };

  //Function used to update the pantryCollection variable if an object is added/removed. Called within
  //the addPantryItem function.
  retrievePantry() {
    firebase_service.readCollection('users/dummy_user/pantry').then(data => {
      this.pantryCollection = data;
    });
  }
  
  ngOnInit(): void {
    this.retrievePantry()
  }

  addPantryItem(ingredient) {
    try {

    let newArray = this.pantryCollection
    let adjustedCategory = newArray[this.selectedCategory.toLowerCase()]
    console.log(newArray)
    if (adjustedCategory.includes(ingredient)) {
      if (confirm('This item is already in your pantry.' + '\n' + 'Press OK to remove it from your pantry.')) {
 
      let index = adjustedCategory.indexOf(ingredient);
      adjustedCategory.splice(index, 1);
      firebase_service.createCollection(`users/dummy_user/pantry/${this.selectedCategory.toLowerCase()}`, adjustedCategory);
      alert("The selected item has been removed from your pantry.");
      this.retrievePantry();
      }      

    } else {
      adjustedCategory.push(ingredient)
      firebase_service.createCollection(`users/dummy_user/pantry/${this.selectedCategory.toLowerCase()}`, adjustedCategory);
      alert("The selected item has been added to your pantry.");
      this.retrievePantry();
    };  

    console.log(newArray);
    console.log(this.pantryCollection);

    } catch (err) {
      alert(`Don't forget to choose which category your ingredient belongs to!`)
    }
  };

  routeToPantry() {
    this.router.navigate(["pantry"]);
  };

  editFirebase() {
    let payload = [
      'milk',
      'coconut milk',
      'chocolate milk'
    ];
    let category = 'dairy'

    firebase_service.createCollection(`users/dummy_user/pantry/${category}`, payload)
    
    // firebase_service.readCollection(`users/dummy_user/pantry/`).then((data) => console.log(data))
    // firebase_service.readCollection(`users/dummy_user/pantry/${category}`).then((data) => console.log(data))

    console.log(this.selectedCategory);

  }

}
