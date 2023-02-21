import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { auth, createUserWithEmailAndPassword } from 'src/firebase/firebase.init';
import { firebase_service } from 'src/firebase/firebase.service';
import { Router } from '@angular/router';

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
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }
  );

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm.value);

    createUserWithEmailAndPassword(auth, this.signupForm.value.email, this.signupForm.value.password).then((userCredentials) => {
      const user = userCredentials.user;
      const userId = user.uid;
      console.log("New ID created: " + userId);

      firebase_service.createCollection("users/" + userId, [this.signupForm.value]);
      this.signupForm.reset();
      this.router.navigate(["home"]);
    });
  }

}
