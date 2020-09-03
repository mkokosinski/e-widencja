import { createSlice, createSelector } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [
    {
      id: '1',
      name: 'Michał',
      surname: 'Kokosiński',
      label: 'Szef',
      isDriver: true,
      eMail: 'boss@ks.pl',
      password: 'dupa123',
    },
    {
      id: '2',
      name: 'Dawid',
      surname: 'Durświński',
      label: 'cieć',
      isDriver: true,
      eMail: 'mop@ks.pl',
      password: 'dupa123',
    },
    {
      id: '3',
      name: 'Miłoś',
      surname: 'Roliński',
      label: 'Łoś',
      isDriver: false,
      eMail: 'las@ks.pl',
      password: 'dupa123',
    },
  ],
  reducers: {
    func: (state) => {
      //function body
    },
  },
});

export const selectUsers = (state) => state.users;

export const selectUser = (id) =>
  createSelector(selectUsers, (users) => users.find((user) => user.id === id));

export const { next } = usersSlice.actions;

export default usersSlice.reducer;
