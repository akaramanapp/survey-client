import { BehaviorSubject } from 'rxjs';
import { LOGIN_SERVICE_SIGNIN } from '../config'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    isAdmin
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(LOGIN_SERVICE_SIGNIN, requestOptions)
        .then(response => response.json())
        .then(jsondata => {
            if ([401, 403].indexOf(jsondata.status) !== -1) {
                authenticationService.logout();
            } else {
                const user = {
                    token: jsondata.token,
                    username: username,
                    role: jsondata.role[0].name
                }

                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
            }
        })
}

function isAdmin() {
    if(currentUserSubject.value && currentUserSubject.value.role && currentUserSubject.value.role === 'ADMIN') {
        return true;
    } else {
        return false;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}