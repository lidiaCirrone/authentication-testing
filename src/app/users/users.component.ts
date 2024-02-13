import { Component } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private usersCollection: CollectionReference<any> | undefined;
  users: Observable<any>;

  constructor(private afStore: Firestore) {
    this.usersCollection = collection(this.afStore, 'users');
    this.users = collectionData(this.usersCollection);
  }
}
