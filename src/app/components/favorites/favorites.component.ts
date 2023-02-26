import { Component, OnInit } from '@angular/core';
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

  callFavorites() {
    const user_id = "dummy_user"
    firebase_service.readCollection(`users/${user_id}/favorite_recipes`).then((data) => {
      console.log(data)
    })
  }

}
