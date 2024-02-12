import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
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

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    this.loading = true;
    const { email, password, firstName, lastName } = form.value;
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });
      form.reset();
      const uid = response.user.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (error: any) {
      console.log(error.message);
    }
    this.loading = false;
  }
}
