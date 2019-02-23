import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/questionActions'
import Highlight from 'react-highlight'
import { Card, Icon } from 'antd';
import './Questions.scss';



import PropTypes from 'prop-types';


class QuestionCard extends Component {
    componentWillMount() {  
        this.props.fetchQuestions()
    }
    
    constructor(props) {
        super(props);
      
        this.state = {
          toggleClass: false
        };
    }

    toggleFunction = () => {
        console.log('toggling')
        this.setState({toggleClass: !this.state.toggleClass})
    }

    getDifficulty = (difficulty) => {
        return difficulty ? difficulty : "Not yet rated"
    }

    render() {
        return (
            <div key={question.id}>
                <Card>
                    <h3>{question.id}. {question.question_name}</h3>
                    <p>{question.question}</p>
                    <h4 onClick={this.toggleFunction}>Solution </h4>
                    <Icon type={this.state.toggleClass?'plus-square':'minus-square'} /> 
                    <Highlight language="javascript" className={this.state.toggleClass?'hidden solutionLine':'solutionLine'}>{question.solution}</Highlight>
                    <h4>Difficulty: {this.getDifficulty(question.difficulty)}</h4>
                </Card>
            </div>
        )
    }
}

Questions.propTypes = {
    fetchQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    questions: state.questions.items.sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, { fetchQuestions })(QuestionCard)
