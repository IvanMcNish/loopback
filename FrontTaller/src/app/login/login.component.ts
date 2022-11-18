import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
  }

}
