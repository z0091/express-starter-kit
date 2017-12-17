import axios from 'axios';

export const loggedIn = () => false;

/**
 * Register new user
 * @param {String} name
 * @param {String} username
 * @param {String} password
 * @return {AxiosPromise<any>}
 */
export const register = (name = '', username = '', password = '') => axios.post('/api/register', {
    name,
    username,
    password,
});
