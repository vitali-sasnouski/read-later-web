import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { finalize } from 'rxjs/operators/finalize';

import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  private isLoaded: boolean;
  user$: Observable<firebase.User>;

  constructor(public firebaseAuth: AngularFireAuth,
              private router: Router,
              private loadingService: LoadingService) {
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
    this.loadingService.start();

    return from(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        tap(_ => this.isLoggedIn = true),
        finalize(() => this.loadingService.stop())
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
