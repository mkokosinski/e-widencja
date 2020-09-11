const loginAdmin = 'Admin';
const passAdmin = 'Dupa123';

export const Auth = async (login, password) =>{
    return login === loginAdmin && password === passAdmin;
}