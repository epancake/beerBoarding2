import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createQuestion } from '../actions';
import './QuestionForm.scss';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      question_name: '',
      question: '',
      solution: '',
      submitter: '',
      difficulty: 1,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getId = this.getId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions.length > this.props.questions.length) {
      this.setState({ redirect: true });
    }
  }

  getId = array => {
    let max = 0;
    array.forEach(item => {
      if (item.id > max) {
        max = item.id;
      }
    });
    return max + 1;
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let newId = this.getId(this.props.questions);

    const question = {
      id: newId,
      question_name: this.state.question_name,
      question: this.state.question,
      solution: this.state.solution,
      submitter: this.state.submitter,
      difficulty: this.state.difficulty
    };

    this.props.createQuestion(question);
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/questions" />;
    }
    return (
      <div>
        <h1>Add a question</h1>
        <form className="addform" id="form" onSubmit={this.onSubmit}>
          <label className="add question_name-label" htmlFor="question_name">
            Question Name:
          </label>
          <input
            className="add question_name-field"
            type="text"
            name="question_name"
            onChange={this.onChange}
            value={this.state.question_name}
          />
          <label className="add question-label" htmlFor="question">
            Question:
          </label>
          <textarea
            className="add question-field"
            name="question"
            cols="30"
            rows="5"
            onChange={this.onChange}
            value={this.state.question}
          />
          <label className="add solution-label" htmlFor="solution">
            Solution:
          </label>
          <textarea
            className="add solution-text"
            name="solution"
            cols="30"
            rows="5"
            onChange={this.onChange}
            value={this.state.solution}
          />
          <label className="add subm-label" htmlFor="submitter">
            Your First and Last Name:
          </label>
          <input
            className="add subm-text"
            type="text"
            name="submitter"
            onChange={this.onChange}
            value={this.state.submitter}
          />
          <label className="add difficulty-label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            className="add difficulty-text"
            type="text"
            name="difficulty"
            onChange={this.onChange}
            value={this.state.difficulty}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input className="add addqbutn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  createQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions.sort((a, b) => a.id - b.id)
});

const mapDispatchToProps = {
  createQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm);
