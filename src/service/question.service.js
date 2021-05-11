import { authHeader, handleResponse } from '../helpers';
import { QUESTION_SERVICE_ADD_QUESTION, OPTIONS_SERVICE_ADD_OPTION } from '../config'

export const questionService = {
    addQuestion,
    addOption
};

function addQuestion(question) {
    const requestOptions = { method: 'POST', body: JSON.stringify(question), headers: authHeader() };
    return fetch(QUESTION_SERVICE_ADD_QUESTION, requestOptions)
    .then(handleResponse)
    .catch(err => console.log(err))
}

function addOption(option) {
    const requestOptions = { method: 'POST', body: JSON.stringify(option), headers: authHeader() };
    return fetch(OPTIONS_SERVICE_ADD_OPTION, requestOptions)
    .then(handleResponse)
    .catch(err => console.log(err))
}