import React from 'react';

import UserForm from './UserForm';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../users/usersSlice';
import { useParams } from 'react-router';

const EditUserForm = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  return user ? <UserForm user={user} /> : null;
};

export default EditUserForm;
