import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { auth, createUserWithEmailAndPassword } from 'src/firebase/firebase.init';
import { firebase_service } from 'src/firebase/firebase.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }
  );

  constructor(private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    createUserWithEmailAndPassword(auth, this.signupForm.value.email, this.signupForm.value.password).then((userCredentials) => {
      const user = userCredentials.user;
      const userId = user.uid;
      console.log(user);
      this.matSnackBar.open(`Account created successfully!\nWelcome user: ${userId}`, "Close");

      firebase_service.createCollection("users/" + userId, [user.providerData[0]]);
      this.signupForm.reset();
      this.router.navigate(["login"]);
    }).catch((err) => {
      console.log(err);
      this.matSnackBar.open(String(err));
    });
  }

}
