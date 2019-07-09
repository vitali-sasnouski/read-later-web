import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  user$: Observable<firebase.User>;
  isLoaded$: Subject<boolean>;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.firebaseAuth.authState;
    this.isLoaded$ = new Subject<boolean>();

    this.user$.subscribe(value => {
      this.isLoggedIn = !!value;

      if (!this.isLoaded$.isStopped) {
        this.isLoaded$.next(true);
        this.isLoaded$.complete();  
      }
    });
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
