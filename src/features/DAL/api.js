import {
  signIn as dummySignIn,
  signUp as dummySignUp,
  signOut as dummySignOut,
} from './dummyAPI';

export const signIn = () => dummySignIn;

export const signUp = () => dummySignUp;

export const signOut = () => dummySignOut;

export const isAuth = () => (localStorage.getItem('token') ? true : false);
