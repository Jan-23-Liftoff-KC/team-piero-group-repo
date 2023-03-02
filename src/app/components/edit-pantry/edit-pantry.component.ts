import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firebase_service } from 'src/firebase/firebase.service';


@Component({
  selector: 'edit-pantry',
  templateUrl: './edit-pantry.component.html',
  styleUrls: ['./edit-pantry.component.scss']
})
export class PantryComponent implements OnInit {

  pantrySearchTerm = '';
  ingredients;
  pantryCollection;

  constructor(private http: HttpClient) { }

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
      this.pantryCollection = Object.values(data);
    });
  }
  
  ngOnInit(): void {
    this.retrievePantry()
  }

  addPantryItem(ingredient) {

    let newArray = this.pantryCollection
    console.log(typeof(newArray))
    if (newArray.includes(ingredient)) {
      if (confirm(`This item is already in your pantry. 
      
Press OK to remove it from your pantry.`)) {
 
      let index = Object.values(newArray).indexOf(ingredient);
      newArray.splice(index, 1);
      firebase_service.createCollection('users/dummy_user/pantry', newArray);
      alert("The selected item has been removed from your pantry.");
      this.retrievePantry();
      }      

    } else {
      newArray.push(ingredient)
      firebase_service.createCollection('users/dummy_user/pantry', newArray);
      alert("The selected item has been added to your pantry.");
      this.retrievePantry();
    };  

  };

}
