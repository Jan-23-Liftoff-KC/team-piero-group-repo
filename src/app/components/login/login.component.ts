import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth, signInWithEmailAndPassword } from 'src/firebase/firebase.init';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router, private matSnackBar: MatSnackBar) { }

  getUrl()
{
  return "url('assets/joanna-kosinska-i0IvwAhhGZM-unsplash.jpg')";
}

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      if(userCredential) {
        const user: User = userCredential.user;
        this.matSnackBar.open(`Sign-in Successful! Welcome ${user.email}`, "CLOSE");
        this.router.navigate(["recipes"]);
      }
    }).catch((error) => {
      this.matSnackBar.open("The following ERROR occurred:\n" + String(error));
      this.router.navigate(["signup"]);
    });
  };

}
