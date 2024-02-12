import { Component } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

   constructor(public afAuth: Auth){}
   user$ = user(this.afAuth);

}
