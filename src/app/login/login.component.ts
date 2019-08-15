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
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login(): void {
    this.auth.login(this.credentials.email, this.credentials.password).subscribe(
      user => {
        const redirect = this.auth.redirectUrl ? this.router.parseUrl(this.auth.redirectUrl) : '';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigateByUrl(redirect, navigationExtras);
      },
      error => {
        console.error('Login error:', error.message);
      }
    );
  }
}
