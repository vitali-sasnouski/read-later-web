import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = {
    email: "",
    password: ""
  }

  constructor(private auth: AuthService, private router: Router) { 
  }

  ngOnInit() {
  }

  login(): void {
    this.auth.login(this.credentials.email, this.credentials.password);
  }
}
