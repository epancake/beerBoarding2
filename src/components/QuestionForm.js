import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/questionActions'
import { fetchQuestions } from '../actions/questionActions'


class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            question_name: '',
            question: '',
            solution: '',
            submitter: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getId = this.getId.bind(this);

    }

    componentWillMount() {  
        this.props.fetchQuestions()
    }

    getId = (array) => {
        let max = 0;
        array.forEach(item => {
          if (item.id > max) {
            max = item.id
          }
        }); return max + 1
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const question = {
            id: this.getId(this.props.questions),
            question_name: this.state.question_name,
            question: this.state.question,
            solution: this.state.solution,
            submitter: this.state.submitter
        }

        this.props.createQuestion(question)
    }
  
    render() {
    return (
      <div>
        <h1>Add a question</h1>
        <form className='addform' id='form' onSubmit={this.onSubmit}>
            <label className='add question_name-label' htmlFor="question_name">Question Name:</label>
            <input className='add question_name-field' type="text" name="question_name" onChange={this.onChange} value={this.state.question_name}></input>
            <label className='add question-label' htmlFor="question" >Question:</label>
            <textarea className='add question-field' name="question" cols="30" rows="5" onChange={this.onChange} value={this.state.question}></textarea>
            <label className='add solution-label' htmlFor="solution">Solution:</label>
            <textarea className='add solution-text' name="solution" cols="30" rows="5" onChange={this.onChange} value={this.state.solution}></textarea>
            <label className='add subm-label' htmlFor="submitter">Your First and Last Name:</label>
            <input className='add subm-text' type="text" name="submitter" onChange={this.onChange} value={this.state.submitter}></input>
            <input className='add addqbutn' type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

QuestionForm.propTypes = {
    createQuestion: PropTypes.func.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    questions: state.questions.items.sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, { createQuestion, fetchQuestions })(QuestionForm)


