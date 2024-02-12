import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { map } from 'rxjs';

const redirectLoggedInToProfile = () =>
  map((user) => (user ? ['profile', (user as any).uid] : true));
const onlyAllowSelf = (next: any) =>
  map((user) => (!!user && next.params.id == (user as any).uid) || ['']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: onlyAllowSelf },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
