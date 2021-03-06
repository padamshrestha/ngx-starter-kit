import { Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess } from './auth.actions';
import { GoogleAnalyticsService } from '@ngx-starter-kit/core/src/lib/services/google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHandler {
  constructor(private actions$: Actions, private analytics: GoogleAnalyticsService) {
    this.actions$.pipe(ofActionSuccessful(Login)).subscribe(action => console.log('Login........Action Successful'));
    this.actions$.pipe(ofActionErrored(Login)).subscribe(action => console.log('Login........Action Errored'));
    this.actions$.pipe(ofActionSuccessful(LoginSuccess)).subscribe((action: LoginSuccess) => {
      this.analytics.setUsername(action.payload.preferred_username);
    });
  }
}
