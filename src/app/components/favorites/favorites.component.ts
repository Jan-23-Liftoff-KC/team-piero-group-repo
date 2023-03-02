import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { auth } from 'src/firebase/firebase.init';
import { firebase_service } from 'src/firebase/firebase.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  user: User = null;
  user_id: string = null;

  constructor() { }

  ngOnInit(): void {
    auth.onAuthStateChanged(user => {
      if(user) {
        this.user = user;
        this.user_id = user.uid;
      }
    });
  }
  callFavorites() {
    const user_id = "dummy_user"
    firebase_service.readCollection(`users/${user_id}/favorite_recipes`).then((data) => {
      console.log(data)
    })
  }

}
