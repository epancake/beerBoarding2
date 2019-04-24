import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import './Questions.scss';
import QuestionCard from './QuestionCard';
import { updateQuestion, destroyQuestion } from '../actions';

import PropTypes from 'prop-types';

const QuestionsContainer = ({ updateQuestion, destroyQuestion, questions }) => {
  if (questions) {
    let sortedQuestions = questions.sort((a, b) => a.id - b.id);
    return (
      <div>
        <h2>The Questions</h2>
        <Link to="/addquestion" className="questioinsLink">
          <Button id="navbtn" className="questionsBtn primary">
            Add a new question
            <Icon type="play-circle-o" />
          </Button>
        </Link>
        {sortedQuestions.map(question => (
          <div key={question.id}>
            <QuestionCard
              updateQuestion={updateQuestion}
              question={question}
              key={question.id}
              deleteQuestion={destroyQuestion}
            />
          </div>
        ))}
      </div>
    );
  } else return 'getting questions';
};

QuestionsContainer.propTypes = {
  questions: PropTypes.array,
  updateQuestion: PropTypes.func.isRequired,
  destroyQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    questions: state.questions
  };
};

const mapDispatchToProps = {
  updateQuestion,
  destroyQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsContainer);
