import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  DocumentReference,
  Firestore,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userDoc: DocumentReference | undefined;
  user$: Observable<any> | undefined;

  constructor(
      private afAuth: Auth, 
      private afStore: Firestore
   ) {}

  ngOnInit(): void {
    this.userDoc = doc(
      this.afStore,
      `users/${this.afAuth.currentUser?.uid ?? ''}`
    );
    this.user$ = docData(this.userDoc);
  }
}
