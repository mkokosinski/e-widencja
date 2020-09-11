import React from 'react';

import { Auth } from '../../app/dummyAPI';
import { useState } from 'react';
import { useHistory } from 'react-router';

const AuthPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const history = useHistory();

  const test = () => {
    Auth(login, password).then((res) => {
      res ? loginSuccess() : setStatus('Zły login lub hasło');
    });
  };

  const loginSuccess = () => {
    setStatus('Udało się zalogować');
    localStorage.setItem('token', 'someToken');
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  return (
    <div>
      <div>
        <input
          type='text'
          onChange={(e) => setLogin(e.target.value)}
          name='login'
        />
      </div>
      <div>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          name='password'
        />
      </div>

      <div>
        {' '}
        <button onClick={test}>Login</button>
      </div>
      <div>{status}</div>
    </div>
  );
};

export default AuthPage;
