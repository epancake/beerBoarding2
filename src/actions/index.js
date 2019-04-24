import { get, post, put, del } from '../api/api_client';
import {
  receiveQuestions,
  addQuestion,
  replaceQuestion,
  deleteQuestion
} from './questionActions';

// questions
export const getAllQuestions = () => dispatch => {
  get('questions').then(questions => {
    dispatch(receiveQuestions(questions));
  });
};

export const createQuestion = question => dispatch => {
  post('questions', question).then(newquestion => {
    dispatch(addQuestion(newquestion));
  });
};

export const updateQuestion = question => dispatch => {
  put(`questions/${question.id}`, question).then(updatedquestion => {
    dispatch(replaceQuestion(updatedquestion));
  });
};

export const destroyQuestion = id => dispatch => {
  del(`questions/${id}`).then(questions => {
    dispatch(deleteQuestion(id));
  });
};
