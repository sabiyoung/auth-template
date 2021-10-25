import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPostPageComponent } from './pages/user-post-page/user-post-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FollowerListComponent } from './pages/follower-list/follower-list.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({

  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    NavigationComponent,
    HomePageComponent,
    UserPageComponent,
    LoginPageComponent,
    SideBarComponent,
    RegisterPageComponent,
    UserPostPageComponent,
    UserProfileComponent,
      FollowerListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects]),
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }


