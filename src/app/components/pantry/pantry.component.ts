import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RootObject } from 'src/app/interfaces/ingredients'




@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {

  pantrySearchTerm = '';
  ingredients;

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


  ngOnInit(): void {
  }

  showTheResults() {
    console.log(this.ingredients);
  }

}
