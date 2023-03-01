import { MethodCall } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { firebase_service } from 'src/firebase/firebase.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayRecipes() {
    const readOut = firebase_service.readCollection("users/dummy_user/favorite_recipes")
    console.log(readOut)


  }

}

