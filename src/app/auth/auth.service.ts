import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Observable, Subject } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { of, from, catchError } from 'rxjs';

import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '';
  private isLoaded = false;
  user$: Observable<firebase.User | null>;

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

    return from(this.firebaseAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        tap(_ => this.isLoggedIn = true),
        finalize(() => this.loadingService.stop())
      );
  }

  logout(): void {
    this.firebaseAuth
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
