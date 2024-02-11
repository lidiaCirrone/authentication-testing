import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
