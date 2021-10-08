import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Tweet } from './../../../../shared/models/tweet.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUserId = '';

  constructor(private api: ApiService,
    private router: Router,

    ) {}

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map((res) => res.data));
  }
  // getTweets() {
  //   return this.api.get<{ data: Tweet[] }>('tweets')
  // }
  createUser(user: User) {
    return this.api
      .post<{ data: User }>('create-user', user)
      .pipe(map((res) => res.data));
  }

  createTweets( tweet: Tweet) {
    return this.api
      .post<{ data: Tweet }>('create-tweet', tweet)
      .pipe(map((res) => res.data))
  }

  login(user: Partial<User>) {
    return this.api
      .post<{ data: User }>('login', user)
      .pipe(map((res) => res.data));
  }
  loginNavigate() {
    return of(this.router.navigate(['posts']))
  }
  updateUser(user: User) {
    return this.api.put<User>('update-user/' + user._id, user);
  }

  deleteUser(user: User) {
    return this.api
      .delete<{ data: User }>('delete-user/' + user._id)
      .pipe(map((res) => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id;
  }
}
