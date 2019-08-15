import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

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

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        tap(_ => this.isLoggedIn = true )
      );
  }

  logout(): void {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
