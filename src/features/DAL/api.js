import {
  signIn as dummySignIn,
  signUp as dummySignUp,
  signOut as dummySignOut,
} from './dummyAPI';

export const signIn = async (login, pass) => dummySignIn(login, pass);

export const signUp = async (login, pass) => dummySignUp(login, pass);

export const signOut = async (login) => dummySignOut(login);

export const isAuth = () => (localStorage.getItem('token') ? true : false);
