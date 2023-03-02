import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth, signInWithEmailAndPassword } from 'src/firebase/firebase.init';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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

    from(signInWithEmailAndPassword(auth, email, password)).subscribe((userCredentials) => {
      const user = userCredentials.user;
      this.matSnackBar.open(`Sign-in Successful! Welcome ${user.email}`, "CLOSE");
      this.router.navigate(["home"]);
    });

  }
}
