import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  createComment,
  createCommentFailure,
  createCommentSuccess,
  createTweet,
  createTweetFailure,
  createTweetSuccess,
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  loadTweetFailure,
  loadTweets,
  loadTweetSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loginNavigateSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  updateComments,
  updateCommentsFailure,
  updateCommentsSuccess,
  updateDislikes,
  updateDislikesFailure,
  updateDislikesSuccess,
  updateLikes,
  updateLikesFailure,
  updateLikesSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,

} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  updateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.data).pipe(
          map((data) => updateUserSuccess({ data })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap((action) =>
        this.userService.createUser(action.data).pipe(
          map((data) => createUserSuccess({ data })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.data).pipe(
          map((data) => deleteUserSuccess({ data })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  loginUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    mergeMap((action) =>
      this.userService.login(action.data).pipe(
        map((data) => loginUserSuccess({ data })),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  )
);

loginSuccess$ = createEffect(() =>
this.actions$.pipe(
  ofType(loginUserSuccess),
  mergeMap((action) =>
    this.userService.loginNavigate().pipe(
      map( () => loginNavigateSuccess())
    )

  )
)
);


createUserTweets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTweet),
      mergeMap((action) =>
        this.userService.createTweets(action.data).pipe(
          map((data) => createTweetSuccess({ data })),
          catchError((error) => of(createTweetFailure({ error })))
        )
      )
    )
  );

loadTweets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTweets),
      mergeMap((action) =>
        this.userService.getTweets().pipe(
          map((data) => loadTweetSuccess({ data })),
          catchError((error) => of(loadTweetFailure({ error })))
        )
      )
    )
  );
updateLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLikes),
      mergeMap((action) =>
        this.userService.incrementLike(action.data).pipe(
          map((data) => updateLikesSuccess({ data })),
          catchError((error) => of(updateLikesFailure({ error })))
        )
      )
    )
  );
updateDisikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDislikes),
      mergeMap((action) =>
        this.userService.decrementLike(action.data).pipe(
          map((data) => updateDislikesSuccess({ data })),
          catchError((error) => of(updateDislikesFailure({ error })))
        )
      )
    )
  );
  createComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createComment),
      mergeMap((action) =>
        this.userService.createComments(action.data).pipe(
          map((data) => createCommentSuccess({ data })),
          catchError((error) => of(createCommentFailure({ error })))
        )
      )
    )
  );

loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComments),
      mergeMap((action) =>
        this.userService.geComments().pipe(
          map((data) => loadCommentsSuccess({ data })),
          catchError((error) => of(loadCommentsFailure({ error })))
        )
      )
    )
  );
  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateComments),
      mergeMap((action) =>
        this.userService.updateComment(action.data).pipe(
          map((data) => updateCommentsSuccess({ data })),
          catchError((error) => of(updateCommentsFailure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private userService: UserService) {}
}
