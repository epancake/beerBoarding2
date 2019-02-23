import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/questionActions'
import Highlight from 'react-highlight'
import { Card, Icon, Button } from 'antd';
import { Link } from "react-router-dom";

import './Questions.scss'


import PropTypes from 'prop-types';


class Questions extends Component {
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
        const questionItems = this.props.questions.map(question => (
            <div key={question.id}>
                <Card>
                    <h3>{question.id}. {question.question_name}</h3>
                    <p>{question.question}</p>
                    <h4 onClick={this.toggleFunction}>Solution <Icon type={this.state.toggleClass?'plus-square':'minus-square'} /></h4>
                    <Highlight language="javascript" className={this.state.toggleClass?'hidden solutionLine':'solutionLine'}>{question.solution}</Highlight>
                    <h4>Submitted By: {question.submitter}</h4>
                    <h4>Difficulty: {this.getDifficulty(question.difficulty)}</h4>
                </Card>
            </div>
        ))
        return (
        <div>
            <h2>The Questions</h2>
            <Link to="/addquestion" className="questioinsLink">
                <Button id='navbtn' className="questionsBtn primary">Add a new question<Icon type="play-circle-o" /></Button>
            </Link>
            { questionItems }
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

export default connect(mapStateToProps, { fetchQuestions })(Questions)
