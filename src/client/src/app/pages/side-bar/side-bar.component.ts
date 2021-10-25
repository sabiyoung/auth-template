import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadUsers, logoutUser } from 'src/app/store/actions/user/user.actions';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  users$: Observable<User[]>
  constructor(
    private store: Store<AppState>,
    private router: Router) {
    this.users$ = this.store.select(usersSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
  logout() {
    this.store.dispatch(logoutUser())
  }
 home() {
    this.router.navigate(['home'])
  }
}
