import * as types from './types';

export const receiveQuestions = questions => {
  return {
    type: types.RECEIVE_QUESTIONS,
    questions
  };
};

export const addQuestion = question => ({
  type: types.CREATE_QUESTION,
  question
});

export const replaceQuestion = question => ({
  type: types.UPDATE_QUESTION,
  question
});

export const deleteQuestion = id => ({
  type: types.DESTROY_QUESTION,
  id
});
