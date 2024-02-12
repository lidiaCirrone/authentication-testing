import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private auth: Auth) {}

  logout(): void {
    signOut(this.auth);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
   return !!this.auth.currentUser;
  }
}
