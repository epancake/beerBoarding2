const questions = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_QUESTIONS':
      return action.questions.questions;
    case 'CREATE_QUESTION':
      return [...state, action.question.questions];
    case 'DESTROY_QUESTION':
      let newDestroyState = [...state].filter(
        question => question.id !== action.id
      );
      return [...newDestroyState];
    case 'UPDATE_QUESTION':
      let updatedState = [...state];
      return updatedState.map(question => {
        if (action.question.question.id !== question.id) {
          return question;
        } else {
          return {
            ...question,
            ...action.question.question
          };
        }
      });
    default:
      return state;
  }
};

export default questions;
