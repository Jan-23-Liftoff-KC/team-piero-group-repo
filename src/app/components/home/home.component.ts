import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'src/firebase/firebase.init';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user = auth.currentUser;

  constructor(private matSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    auth.signOut().catch((err) => console.log(err));
    this.matSnackBar.open("signed out successfully", "CLOSE");
    this.router.navigate(["landing"]);
  }

}
