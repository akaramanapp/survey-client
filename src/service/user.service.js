import { handleResponse } from '../helpers';
import { USER_SERVICE_SIGNUP } from '../config'

export const userService = {
    signup
};

function signup(user) {
    const requestOptions = {
        method: 'POST', 
        body: JSON.stringify(user), 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return fetch(USER_SERVICE_SIGNUP, requestOptions)
    .then(handleResponse)
    .catch(err => {
        console.error(err)
    });
}