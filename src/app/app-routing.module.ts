import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard, customClaims } from '@angular/fire/auth-guard';
import { map, pipe } from 'rxjs';
import { UsersComponent } from './users/users.component';

const onlyAllowSelf = (next: any) =>
  map((user) => (!!user && next.params.id == (user as any).uid) || ['']);

const adminOnly = () =>
  pipe(
    customClaims,
    map((claims: any) => claims.admin === true || [''])
  );

const redirectLoggedInToProfileOrUsers = () =>
  pipe(
    customClaims,
    map((claims: any) => {
      console.debug("claims: ", claims);
      // if no claims, then there's no authenticated user
      // so allow the route ['']
      if (claims.length === 0) return true;

      // if a custom claim is set, then redirect to ['users']
      if (claims.admin) return ['users'];

      // otherwise, redirect to user's profile page
      return ['profile', claims.user_id];
    })
  );

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfileOrUsers },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: onlyAllowSelf },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: adminOnly },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
