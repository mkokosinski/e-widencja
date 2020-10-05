const loginAdmin = 'Admin';
const passAdmin = 'Demo123';

export const signIn = async (login, password) => {
  if (login === loginAdmin && password === passAdmin) {
    return {
      token: 'some token',
      user: {
        login: 'Admin',
        company: 1,
        userId: 1,
      },
    };
  } else {
    throw Error(`Niepoprawne dane. Login: ${login} | Password: ${password}`);
  }
};

export const signUp = async (login, password) => {
  return login === loginAdmin && password === passAdmin;
};

export const signOut = async (login) => {
  localStorage.removeItem('token');
};
