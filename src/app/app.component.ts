import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'authentication-testing';

  constructor(public auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}
