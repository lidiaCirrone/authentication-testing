import { Component, OnInit } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  doc,
  docData,
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../core/user-profile.model';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userDoc: DocumentReference | undefined;
  user$: Observable<any> | undefined;
  uid: string | null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private auth: AuthService,
    private afStore: Firestore,
    private route: ActivatedRoute
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userDoc = doc(this.afStore, `users/${this.uid}`);
    this.user$ = docData(this.userDoc);
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;
    const { email, name, address, city, state, zip, ip, phone, specialty } =
      ngForm.form.getRawValue();
    const userProfile: UserProfile = {
      uid: this.uid ?? '',
      email,
      name,
      address,
      city,
      state,
      zip,
      ip,
      phone,
      specialty,
    };
    try {
      await this.auth.updateUserDocument(userProfile);
    } catch (error: any) {
      console.log(error.message);
      this.error = error.message;
    }
    this.loading = false;
  }
}
