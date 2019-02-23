import { FETCH_QUESTIONS, NEW_QUESTION } from './types';

const baseUrl = 'https://beerboardapi.herokuapp.com/'

export const fetchQuestions = () => dispatch => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => 
        dispatch({
            type: FETCH_QUESTIONS,
            payload: data.questions,
        })
    );
};

export const createQuestion = (questionData) => dispatch => {
    console.log('action post called', questionData)
    let url = baseUrl + 'questions';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(questionData),
        headers: new Headers({
        'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(question => 
        dispatch({
            type: NEW_QUESTION,
            payload: question
        })
    );
}
