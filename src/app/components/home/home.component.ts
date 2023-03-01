import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'src/firebase/firebase.init';
import { User } from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = null;

  constructor(private matSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        this.user = user;
      } else {
        console.log("no user logged in");
      }
    });
  }

  signOut() {
    auth.signOut().catch((err) => console.log(err));
    this.matSnackBar.open("signed out successfully", "CLOSE");
    this.router.navigate([""]);
  }

}
