import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);

  public passwordFieldType = 'password';
  public passwordVisibilityIcon = 'visibility_off';

  private isPasswordVisible = false;


  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  login(): void {
    this.auth.login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe({
        next: user => {
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
        error: regError => {
          const sb = this.snackBar.open(regError.message, 'Close', {
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['login-snackbar-error']
          });

          sb.onAction().subscribe(() => {
            sb.dismiss();
          });
        }
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;

    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
    this.passwordVisibilityIcon = this.isPasswordVisible ? 'visibility_on' : 'visibility_off';
  }
}
