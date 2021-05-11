import { authHeader, handleResponse } from '../helpers';
import { SURVEY_SERVICE_GETALL, SURVEY_SERVICE_USER_RESPONSE, SURVEY_SERVICE_ADD_SURVEY } from '../config'

export const surveyService = {
    getAll,
    userResponse,
    addSurvey
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(SURVEY_SERVICE_GETALL, requestOptions)
    .then(handleResponse)
    .catch(err => console.log(err))
}

function userResponse(request) {
    const requestOptions = { method: 'POST', body: JSON.stringify(request), headers: authHeader() };
    return fetch(SURVEY_SERVICE_USER_RESPONSE, requestOptions)
    .then(handleResponse)
    .catch(err => console.log(err))
}

function addSurvey(survey) {
    const requestOptions = { method: 'POST', body: JSON.stringify(survey), headers: authHeader() };
    return fetch(SURVEY_SERVICE_ADD_SURVEY, requestOptions)
    .then(handleResponse)
    .catch(err => console.log(err))
}