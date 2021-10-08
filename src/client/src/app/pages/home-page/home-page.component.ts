import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { usersSelector, selectedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  constructor(
    private store: Store<AppState>,
  ) {
    this.users$ = this.store.select(usersSelector);
    this.selectedUser$ = this.store.select(selectedUserSelector);
   }

  ngOnInit(): void {
  }

}
