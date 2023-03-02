import { Component, OnInit } from '@angular/core';
import { auth } from 'src/firebase/firebase.init';
import { User } from "firebase/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe-generator-angular-app';
  user: User = null;
  user_id: string = null;

  constructor(private matSnackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    auth.onAuthStateChanged(user => {
      if(user) {
        this.user = user;
        this.user_id = user.uid;
      }
    });
  }

  signOut() {
    auth.signOut().then(() => {
      this.matSnackBar.open("Signed out successfully!", "CLOSE");
      this.router.navigate(["recipes"]);
    }).catch(error => {
      this.matSnackBar.open(String(error), "CLOSE");
      this.router.navigate(["login"]);
    })
  }
}
