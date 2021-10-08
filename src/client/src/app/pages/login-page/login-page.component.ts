import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { Router } from '@angular/router';
import { UsersListComponent } from 'src/app/components/users-list/users-list.component';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService ) { }

  ngOnInit(): void {
  }
  login() {
     this.router.navigateByUrl('/home')
  }
}


