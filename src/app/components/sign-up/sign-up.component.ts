import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  getUrl()
  {
    return "url('assets/joanna-kosinska-i0IvwAhhGZM-unsplash.jpg')";
  }
}
