import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  getUrl()
  {
    return "url('assets/geo-darwin-zdunBSAi3P0-unsplash.jpg')";
  }

  ngOnInit(): void {
  }

}
