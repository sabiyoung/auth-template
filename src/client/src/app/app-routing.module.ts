import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInputComponent } from './components/user-input/user-input.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserPostPageComponent } from './pages/user-post-page/user-post-page.component';


const routes: Routes = [

   {path: 'sign-in', component: LoginPageComponent},
  {path: 'users-post', component: UserPostPageComponent},
  {path: '', component: HomePageComponent},
  {path: '**', redirectTo:" sign-up"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
