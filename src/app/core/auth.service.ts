import { Injectable } from '@angular/core';
import { Auth, getIdTokenResult, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserProfile } from './user-profile.model';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: Auth,
    private afStore: Firestore
  ) {}

  async logout(): Promise<void> {
    await signOut(this.afAuth);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }

  createUserDocument(): void {
    // get the current user
    const user = this.afAuth.currentUser;

    // create the object eith new declarations
    const userProfile: UserProfile = {
      uid: user?.uid ?? '',
      email: user?.uid ?? '',
      name: user?.displayName ?? '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      specialty: '',
      ip: '',
    };

    // write to Firebase
    const userDoc = doc(this.afStore, `users/${user?.uid}`);
    setDoc(userDoc, userProfile);
  }

  updateUserDocument(userProfile: any): Promise<void> {
    const userDoc = doc(this.afStore, `users/${userProfile?.uid}`);
    return updateDoc(userDoc, userProfile);
  }

  async routeOnlogin() {
    const user = this.afAuth.currentUser;
    if (user) {
      const token = await getIdTokenResult(user);
      this.router.navigate(
        token.claims['admin'] ? ['/users'] : [`/profile/${user.uid}`]
      );
    }
  }
}
