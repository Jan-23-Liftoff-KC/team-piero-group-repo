import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startEmailLogin } from 'src/firebase/firebase.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    startEmailLogin(this.loginForm.value.email, this.loginForm.value.password).then((res) => {
      console.log(res)
    }).catch((res) => {
      console.log(res)
    })
  }
}
