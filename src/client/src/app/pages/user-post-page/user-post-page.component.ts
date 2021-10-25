import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store';
import {
  createComment,
  createTweet,
  deleteUser,
  loadComments,
  loadTweets,
  logoutUser,
  updateDislikes,
  updateFollowers,
  updateFollowing,
  updateLikes,
} from 'src/app/store/actions/user/user.actions';
import {
  CommentSelector,
  usersSelector,
  UserTweetSelector,
} from 'src/app/store/selectors/user/user.selectors';
import { Comment } from '../../../../../shared/models/comment.model';
import { Tweet } from '../../../../../shared/models/tweet.model';
import { User } from '../../../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-post-page',
  templateUrl: './user-post-page.component.html',
  styleUrls: ['./user-post-page.component.scss'],
})
export class UserPostPageComponent implements OnInit {
  tweets$: Observable<Tweet[]>;
  comments$: Observable<Comment[]>;
  images: any;
  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private socketService: SocketService,
    private router: Router,
    private https:HttpClient

  ) {
    this.store.dispatch(loadTweets());
    this.store.dispatch(loadComments());
    this.tweets$ = this.store.select(UserTweetSelector);
    this.comments$ = this.store.select(CommentSelector);
  }

  ngOnInit(): void {
    this.socketService.listen('user tweet').subscribe((data) => {
      console.log(data);
    });
  }


  createTweet(text: string) {
    this.store.dispatch(createTweet({ data: { text } }));
  }

  onIncrement(tweet: Tweet) {
    this.store.dispatch(updateLikes({ data: tweet }));
  }

  createComment(text: string, tweet: Tweet) {
    // this.userService.createComments({text, tweet}).subscribe()
    this.store.dispatch(createComment({ data: { text: text, tweet: tweet } }));
  }
  profile() {
    this.router.navigate(['user-profile']);
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    this.https.post<any>('http://localhost:3502/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
