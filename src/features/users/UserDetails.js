import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';

const UserDetails = () => {
  const { id } = useParams();
  const { goBack } = useHistory();

  const user = useSelector((state) => selectUserById(state, id));

  return user ? (
    <div>
      <button onClick={goBack}>go back</button>
      <div>name: {user.name}</div>
      <div>surname: {user.surname}</div>
      <div>label: {user.label}</div>
      <div>isDriver: {user.isDriver.toString()}</div>
      <div>eMail: {user.eMail}</div>
      <div>password: {user.password}</div>
    </div>
  ) : null;
};

export default UserDetails;
