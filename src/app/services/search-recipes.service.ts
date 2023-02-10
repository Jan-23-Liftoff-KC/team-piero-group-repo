import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { RootObject } from 'src/app/interfaces/recipes';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SearchRecipesService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'x-rapidapi-host': 'tasty.p.rapidapi.com',
    'x-rapidapi-key': '7c74d55e43msh895d92d3174837fp19733djsn47065daa1688'
  });

  getRecipes(searchTerm: string): Observable<RootObject> {
    return this.http
      .get<RootObject>('https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&tags=under_30_minutes&', {
        headers: this.headers,
        params: new HttpParams()
        .set("q", searchTerm)
        
        // Need to add a variable that allows users to add tags to their searchTerm. Perhaps
        // using a dropbox that lists available tags, or by using checkboxes.
        .set("tags", "")
      })
  };














  // options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '7c74d55e43msh895d92d3174837fp19733djsn47065daa1688',
  //     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  //   }
  // };

  // getRecipes() {
  //   return fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=chicken%20noodle', this.options)
  //     // .toPromise()
  //     .then(response => response.json())
  //     // .then(response => console.log(response))
  //     .catch(err => console.error(err));
  // };

};
