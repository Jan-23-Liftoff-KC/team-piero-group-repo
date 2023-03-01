import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';



@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  headers = new HttpHeaders({
    'X-RapidAPI-Key': '7c74d55e43msh895d92d3174837fp19733djsn47065daa1688',
    'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
  });

  getRecipes(searchTerm: string) {
    return this.http
      .get('https://yummly2.p.rapidapi.com/feeds/auto-complete', {
        headers: this.headers,
        params: new HttpParams()
        .set("q", searchTerm)
      })
      .subscribe(resp => 
        console.log(resp));
  };

}
