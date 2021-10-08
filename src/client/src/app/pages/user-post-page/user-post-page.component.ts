
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store';
import { UserTweet } from 'src/app/store/actions/user/user.actions';
import { UserTweetSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-post-page',
  templateUrl: './user-post-page.component.html',
  styleUrls: ['./user-post-page.component.scss']
})
export class UserPostPageComponent implements OnInit {
  //  tweets$: Observable<User[]>
  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private store: Store<AppState>

  ) {

    // this.tweets$ = this.store.select(UserTweetSelector)
    // this.store.dispatch(UserTweet({data: }))
   }

  ngOnInit(): void {
    this.socketService.listen('user tweet').subscribe((data) => {
      console.log(data)
    })
  }

  createTweet(text: string) {
    this.userService.createTweets( {text}).subscribe()
    // this.store.dispatch(UserTweet())
  }
}
