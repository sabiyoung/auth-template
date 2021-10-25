import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store';
import { updateFollowers, updateFollowing } from 'src/app/store/actions/user/user.actions';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss']
})
export class FollowerListComponent implements OnInit {
  users$: Observable<User[]>
  constructor(
    private userService: UserService,
    private store: Store<AppState>,
  ) {
    this.users$ = this.store.select(usersSelector)
  }



  ngOnInit(): void {
  }
  updateFollowers(user: User) {
    this.store.dispatch(updateFollowers({data:user}))
    console.log(user)
  }
  updateFollowing(user: User) {
    this.store.dispatch(updateFollowing({data:user}))
  }
  // checkSelected(selectedUser: User | null, user: User) {
  //   return this.isSelected(selectedUser, user) ? 'green' : 'black';
  // }
  
}
