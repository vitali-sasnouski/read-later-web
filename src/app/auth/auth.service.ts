import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  private isLoaded: boolean;
  user$: Observable<firebase.User>;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.firebaseAuth.authState;
  }

  isSignedIn(): Observable<boolean> {
    if (this.isLoaded) {
      return of(this.isLoggedIn);
    }

    return this.user$.pipe(
      map(v => {
        return !!v;
      }),
      tap(v => {
        this.isLoaded = true;
        this.isLoggedIn = v;
      })
    );
  }

  login(email: string, password: string): void {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.info('Success!', value);
        this.isLoggedIn = true;

        let redirect = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/articles';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigateByUrl(redirect, navigationExtras);        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout(): void {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => { 
        console.info('Logout');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
}
