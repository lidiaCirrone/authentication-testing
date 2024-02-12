import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  action: 'login' | 'signup' = 'login';
  error: string = '';

  constructor(private afAuth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = '';
    const { email, password, firstName, lastName } = form.value;
    let response;
    try {
      if (this.isSignUp) {
        response = await createUserWithEmailAndPassword(
          this.afAuth,
          email,
          password
        );
        await updateProfile(response.user, {
          displayName: `${firstName} ${lastName}`,
        });
        form.reset();
      } else {
        response = await signInWithEmailAndPassword(this.afAuth, email, password);
      }
      const uid = response.user.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (error: any) {
      console.log(error.message);
      this.error = error.message;
    }
    this.loading = false;
  }

  get isLogin(): boolean {
    return this.action === 'login';
  }

  get isSignUp(): boolean {
    return this.action === 'signup';
  }
}
