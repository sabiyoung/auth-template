import { Action, createReducer, on } from '@ngrx/store';
import { Tweet } from '../../../../../../shared/models/tweet.model';
import { User } from '../../../../../../shared/models/user.model';
import {Comment } from '../../../../../../shared/models/comment.model';
import {
  createCommentSuccess,
  createTweetSuccess,
  createUserSuccess,
  deleteUserSuccess,
  loadCommentsSuccess,
  loadTweets,
  loadTweetSuccess,
  loadUsers,
  loadUsersSuccess,
  selectUserAction,
  updateCommentsSuccess,
  updateDislikesSuccess,
  updateLikesSuccess,
  updateUserSuccess,
} from '../../actions/user/user.actions';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  userTweet: Tweet[];
  comments: Comment[];
}

export const initialState: State = {
  users: [],
  selectedUser: null,
  userTweet: [],
  comments: []
};

export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data };
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data };
  }),
  on(updateUserSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.map((user) =>
        user._id === action.data._id ? action.data : user
      ),
    };
  }),
  on(deleteUserSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user._id !== action.data._id),
    };
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return { ...state, users };
  }),
  on(createTweetSuccess, (state, action) => {
    const tweets = [...state.userTweet];
    tweets.push(action.data);
    return { ...state, userTweet: tweets };
  }),

  on(updateLikesSuccess, (state, action) => {
    return { ...state, userTweet: state.userTweet.map(tweet => tweet._id === action.data._id ? action.data : tweet) };
  }),

  on(updateDislikesSuccess, (state, action) => {
    return { ...state, userTweet: state.userTweet.map(tweet => tweet._id === action.data._id ? action.data : tweet) };
  }),
  on(loadTweetSuccess, (state, action) => {
    return {...state, userTweet: action.data}
  }),

  on(createCommentSuccess, (state, action) => {
    const newComments = [...state.comments];
    newComments.push(action.data);
    return { ...state, comments: newComments };
  }),
  on(loadCommentsSuccess, (state, action) => {
    return {...state, comments: action.data}
  }),
  on(updateCommentsSuccess, (state, action) => {
    return { ...state, comments: state.comments.map(comment => comment._id === action.data._id ? action.data : comment) };
  }),
);
