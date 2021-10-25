import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { createUser, loginUser, updateUser } from 'src/app/store/actions/user/user.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../../shared/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  addUser: FormGroup;

  constructor(private fb: FormBuilder,
     private store: Store<AppState>,
     private router: Router
    ) {
    this.addUser = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit(): void {}

login() {
    this.store.dispatch(loginUser({ data: this.addUser.value }))
  }
  signin() {
    this.router.navigate(['/'])
  }
}


