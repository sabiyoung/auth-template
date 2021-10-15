
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store';
import { createComment, createTweet, loadComments, loadTweets, updateDislikes, updateLikes } from 'src/app/store/actions/user/user.actions';
import { CommentSelector, UserTweetSelector } from 'src/app/store/selectors/user/user.selectors';
import { Comment } from '../../../../../shared/models/comment.model';
import { Tweet } from '../../../../../shared/models/tweet.model';

@Component({
  selector: 'app-user-post-page',
  templateUrl: './user-post-page.component.html',
  styleUrls: ['./user-post-page.component.scss']
})
export class UserPostPageComponent implements OnInit {
  tweets$:Observable<Tweet[]>
  comments$:Observable<Comment[]>
   constructor(
     private userService: UserService,
     private store: Store<AppState>,
     private socketService: SocketService
   ) {
     this.store.dispatch(loadTweets())
     this.store.dispatch(loadComments());
     this.tweets$ = this.store.select(UserTweetSelector);
     this.comments$ = this.store.select(CommentSelector)
    }


  ngOnInit(): void {
    this.socketService.listen('user tweet').subscribe((data) => {
      console.log(data)
    })

  }


  createTweet(text: string) {
//  this.userService.createTweets( {text}).subscribe();
 this.store.dispatch(createTweet({data:{text}}))

  }

  onIncrement(tweet: Tweet) {
    this.store.dispatch(updateLikes({data:tweet}))
    // console.log(this.onIncrement)

  }

  onDecrement(tweet: Tweet) {
    this.store.dispatch(updateDislikes({data:tweet}))
    // console.log(this.onIncrement)
  }
  createComment(text: string, tweet: Tweet) {
    // this.userService.createComments({text, tweet}).subscribe()
this.store.dispatch(createComment({data:{text: text, tweet: tweet}}))
     }


}
