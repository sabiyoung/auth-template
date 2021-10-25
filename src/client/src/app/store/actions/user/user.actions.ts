import { createAction, props } from '@ngrx/store';
import { Error } from 'mongoose';
import { Tweet } from '../../../../../../shared/models/tweet.model';
import { User } from '../../../../../../shared/models/user.model';
import {Comment} from '../../../../../../shared/models/comment.model';
export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: Error }>()
);

export const selectUserAction = createAction(
  '[User] Select User',
  props<{ data: User | null }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{data: User}>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ data: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: Error }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{data: User}>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ data: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: Error }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{data: User}>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ data: User }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: Error }>()
);

export const loginUser = createAction(
  '[User] Login User',
  props<{data: Partial<User>}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ data: User }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: Error }>()
);
//
export const logoutUser = createAction(
  '[User] Logout User',
);
export const logoutUserSuccess = createAction(
  '[User] Logout User Success',
);
export const logoutUserFailure = createAction(
  '[User] Logout User Failure',
);
//
export const createTweet = createAction(
  '[User] Create Tweet',
  props<{data: Tweet}>()
);

export const createTweetSuccess = createAction(
  '[User] Create Tweet success',
  props<{data: Tweet}>()
);
export const createTweetFailure = createAction(
  '[User] Create Tweet Failure',
  props<{ error: Error }>()
);


export const loadTweets = createAction(
  '[User] load Tweet',
);
export const loadTweetSuccess = createAction(
  '[User]  Load Tweet Success',
  props<{ data: Tweet[]}>()
);

export const loadTweetFailure = createAction(
  '[User] Load Tweet Failure',
  props<{ error: Error }>()
);

export const loginNavigateSuccess = createAction(
  '[User]  login navivage success',
);

export const logoutNavigateSuccess = createAction(
  '[User]  logout navivage success',
);


export const updateLikes = createAction(
  '[User]  Update Likes',
  props<{data: Tweet}>()
);
export const updateLikesSuccess = createAction(
  '[User]  Update Likes Success',
  props<{ data: Tweet}>()
);
export const updateLikesFailure = createAction(
  '[User] Update Likes Failure',
  props<{ error: Error }>()
);
export const updateDislikes = createAction(
  '[User]  Update Dislikes',
  props<{data: Tweet}>()
);
export const updateDislikesSuccess = createAction(
  '[User]  Update Dislikes Success',
  props<{ data: Tweet}>()
);
export const updateDislikesFailure = createAction(
  '[User] Update Dislikes Failure',
  props<{ error: Error}>()
);

export const createComment = createAction(
  '[User] Create Comment',
  props<{data: Comment}>()
);

export const createCommentSuccess = createAction(
  '[User] Create Comment success',
  props<{data: Comment}>()
);
export const createCommentFailure = createAction(
  '[User] Create Comment Failure',
  props<{ error: Error }>()
);


export const loadComments = createAction(
  '[User] load Comment',
);
export const loadCommentsSuccess = createAction(
  '[User]  Load Comment Success',
  props<{ data: Comment[]}>()
);

export const loadCommentsFailure = createAction(
  '[User] Load Comment Failure',
  props<{ error: Error }>()
);

export const updateComments = createAction(
  '[User]  Update Comments',
  props<{data: Comment}>()
);
export const updateCommentsSuccess = createAction(
  '[User]  Update Comments Success',
  props<{ data: Comment}>()
);

export const updateCommentsFailure = createAction(
  '[User] Update Comments Failure',
  props<{ error: Error }>()
);
// followers
export const updateFollowers = createAction(
  '[User]  Update User Followers',
  props<{data: User}>()
);
export const updateFollowersSuccess = createAction(
  '[User]  Update User Followers Success',
  props<{ data: User}>()
);
export const updateFollowersFailure = createAction(
  '[User] Update User Followers Failure',
  props<{ error: Error }>()
);
export const updateFollowing = createAction(
  '[User] Update User Following',
  props<{data: User}>()
);
export const updateFollowingSuccess = createAction(
  '[User]  Update User Following Success',
  props<{ data: User}>()
);

export const updateFollowingFailure = createAction(
  '[User] Update User Following Failure',
  props<{ error: Error }>()
);
export const loadFollowing = createAction(
  '[User] load Following',
);

