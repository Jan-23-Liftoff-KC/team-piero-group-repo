import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { auth } from 'src/firebase/firebase.init';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {

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
}
