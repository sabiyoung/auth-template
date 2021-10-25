import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store';
import {
  createComment,
  createTweet,
  loadComments,
  loadTweets,
  loadUsers,
  selectUserAction,
  updateFollowers,
  updateFollowing,
  updateLikes,
} from 'src/app/store/actions/user/user.actions';
import {
  CommentSelector,
  usersSelector,
  UserTweetSelector,
} from 'src/app/store/selectors/user/user.selectors';
import { Tweet } from '../../../../../shared/models/tweet.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  users$: Observable<User[]>;
  tweets$: Observable<Tweet[]>;
  // comments$:Observable<Comment[]>

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(usersSelector);
    this.store.dispatch(loadTweets());
    this.store.dispatch(loadComments());
    this.tweets$ = this.store.select(UserTweetSelector);
    // this.comments$ = this.store.select(CommentSelector)
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  createTweet(text: string) {
    this.store.dispatch(createTweet({ data: { text } }));
  }

  onIncrement(tweet: Tweet) {
    this.store.dispatch(updateLikes({ data: tweet }));
  }

  createComment(text: string, tweet: Tweet) {
    this.store.dispatch(createComment({ data: { text: text, tweet: tweet } }));
  }
  updateFollowers(user: User) {
    this.store.dispatch(updateFollowers({ data: user }));
    console.log(user);
  }
  updateFollowing(user: User) {
    this.store.dispatch(updateFollowing({ data: user }));
  }

}
