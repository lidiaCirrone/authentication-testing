import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private afAuth: Auth) {}

  logout(): void {
    signOut(this.afAuth);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
   return !!this.afAuth.currentUser;
  }
}
