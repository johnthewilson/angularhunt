import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getCurrentUser } from '../reducers/index';
import { UserActions } from '../actions/user.actions';
import { User } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  user$: Observable<User>;
  constructor(private userActions: UserActions,
    private store: Store<AppState>) {

    this.user$ = this.store.select(getCurrentUser);
  }

  login(provider: string) {
    this.store.dispatch(this.userActions.login(provider));
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  ngOnInit() {
    this.store.dispatch(this.userActions.loadCurrentUserProfile());
  }

  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }
}