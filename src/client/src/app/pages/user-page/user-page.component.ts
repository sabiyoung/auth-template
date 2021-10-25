import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { usersSelector, selectedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  constructor(    private store: Store<AppState>) {
    this.users$ = this.store.select(usersSelector);
    this.selectedUser$ = this.store.select(selectedUserSelector);
  }

  ngOnInit(): void {
  }

}
