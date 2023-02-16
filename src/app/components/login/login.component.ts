import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { signInWithPopup } from 'firebase/auth';
import { startCreateUserWithEmailLogin, startGoogleLogin } from 'src/firebase/firebase.auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder
  ) { 
    this.form= _FormBuilder.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void { }

  getUrl()
{
  return "url('assets/joanna-kosinska-i0IvwAhhGZM-unsplash.jpg')";
}

  clickedSubmit() {
    console.log(this.form.value)
    // startCreateUserWithEmailLogin(email,password)
  }

  googleBtn(email,password){
    startGoogleLogin()
  }

}
