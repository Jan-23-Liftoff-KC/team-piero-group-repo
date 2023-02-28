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
    'x-rapidapi-key': '47c620be6bmshcd09d2f02d1bf5dp14967ejsnbe17a2cc0cc9'
  });


  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
    }

  getRecipes(searchTerm: string): Observable<RootObject> {
    return this.http.get<RootObject>('https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&', {
        headers: this.headers,
        params: new HttpParams()
        .set("q", searchTerm)
        
        // Need to add a variable that allows users to add tags to their searchTerm. Perhaps
        // using a dropbox that lists available tags, or by using checkboxes.
        .set("tags", "")
      })
  };


};
