import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { FirestoreModule } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ProfileComponent, UsersComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FirestoreModule,
    FormsModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
