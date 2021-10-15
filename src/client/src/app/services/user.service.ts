import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Tweet } from './../../../../shared/models/tweet.model';
import { Comment } from './../../../../shared/models/comment.model';

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
  getTweets() {
    return this.api.get<{ data: Tweet[] }>('tweets').pipe(map((res) => res.data));
  }
  geComments() {
    return this.api.get<{ data: Comment[] }>('comments').pipe(map((res) => res.data));
  }
  getLikes() {
    return this.api.get<{ data: Tweet[] }>('tweets').pipe(map((res) => res.data));
  }
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
  createComments( comment: Comment) {
    return this.api
      .post<{ data: Comment }>('create-comment', comment)
      .pipe(map((res) => res.data))
  }

  login(user: Partial<User>) {
    return this.api
      .post<{ data: User }>('login', user)
      .pipe(map((res) => res.data));
  }
  loginNavigate() {
    return of(this.router.navigate(['users-post']))
  }
  updateUser(user: User) {
    return this.api.put<User, User>('update-user/' + user._id, user);
  }
 incrementLike(tweet: Tweet) {
   console.log("tweet")
    return this.api.put<Tweet, Tweet>('increment-tweet-like/' + tweet._id, tweet );
  }
 decrementLike(tweet: Tweet) {
    return this.api.put<Tweet, Tweet>('decrement-tweet-like/' + tweet._id, tweet);
  }
 updateComment(comment: Comment) {
    // console.log("comment")
     return this.api.put<Comment,Comment>('update-comment/' + comment._id, comment );
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
