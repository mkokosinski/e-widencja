const loginAdmin = 'Admin';
const passAdmin = 'Dupa123';

export const signIn = async (login, password) =>{
    return login === loginAdmin && password === passAdmin;
}

export const signUp = async (login, password) =>{
    return login === loginAdmin && password === passAdmin;
}

export const signOut = async (login) =>{
    localStorage.removeItem('token');
}