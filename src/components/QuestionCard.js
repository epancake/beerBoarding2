import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { Card, Icon, Button, Modal } from 'antd';
import './Questions.scss';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleAnswer: true,
      updateModalIsOpen: false,
      question_name: this.props.question.question_name,
      question: this.props.question.question,
      solution: this.props.question.solution,
      submitter: this.props.question.submitter
    };
  }

  toggleFunction = () => {
    this.setState({ toggleAnswer: !this.state.toggleAnswer });
  };

  transitionUpdateModal = () => {
    this.setState({ updateModalIsOpen: !this.state.updateModalIsOpen });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitUpdate = e => {
    e.preventDefault();
    this.transitionUpdateModal();

    const form = e.target;
    const data = new FormData(form);
    const question = {
      id: this.props.question.id,
      question_name: data.get('qname'),
      question: data.get('qtext'),
      solution: data.get('solution'),
      submitter: data.get('submitter'),
      difficulty: data.get('difficulty')
    };

    this.props.updateQuestion(question);
  };

  render() {
    return (
      <div key={this.props.question.id}>
        <Card>
          <h3>
            {this.props.question.id}. {this.props.question.question_name}
          </h3>
          <p>{this.props.question.question}</p>
          <h4 onClick={this.toggleFunction}>
            Solution{' '}
            <Icon
              type={this.state.toggleAnswer ? 'plus-square' : 'minus-square'}
            />{' '}
          </h4>
          <Highlight
            language="javascript"
            className={
              this.state.toggleAnswer ? 'hidden solutionLine' : 'solutionLine'
            }
          >
            {this.props.question.solution}
          </Highlight>
          <h4>
            Difficulty:{' '}
            {this.props.question.difficulty
              ? this.props.question.difficulty
              : 'Not yet rated'}
          </h4>
          <Button
            id="update"
            onClick={this.transitionUpdateModal}
            type="primary"
          >
            Update <Icon type="edit" />
          </Button>
        </Card>

        <Modal
          visible={this.state.updateModalIsOpen}
          isOpen={this.state.updateModalIsOpen}
          onRequestClose={this.transitionUpdateModal}
          onCancel={this.transitionUpdateModal}
          footer={null}
          contentLabel="Update Modal"
        >
          <h3>Update the question</h3>
          <p className="updateInstr">
            Fill in all the fields and the question will be updated.
          </p>
          <form className="addform" id="form" onSubmit={this.onSubmitUpdate}>
            <label
              className="add qid-label hidden"
              htmlFor="qid"
              onChange={this.onChange}
            >
              Question ID:
            </label>
            <input
              className="add qid-field hidden"
              type="text"
              name="qid"
              defaultValue={this.props.question.id}
            />
            <label className="add qname-label" htmlFor="qname">
              Question Name:
            </label>
            <input
              className="add qname-field"
              type="text"
              name="qname"
              defaultValue={this.props.question.question_name}
            />
            <label className="add qtext-label" htmlFor="qtext">
              Question:{' '}
            </label>
            <textarea
              className="add qtext-field"
              name="qtext"
              rows="5"
              defaultValue={this.props.question.question}
            />
            <label className="add sname-label" htmlFor="solution">
              Solution:{' '}
            </label>
            <textarea
              className="add sname-text"
              name="solution"
              rows="5"
              defaultValue={this.props.question.solution}
            />
            <label className="add subm-label" htmlFor="submitter">
              Your First and Last Name:
            </label>
            <input
              className="add subm-text"
              type="text"
              name="submitter"
              defaultValue={this.props.question.submitter}
            />
            <label className="add difficulty-label" htmlFor="difficulty">
              Difficulty
            </label>
            <select
              className="add difficulty-text"
              type="text"
              name="difficulty"
              defaultValue={this.props.question.difficulty}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              className="add addqbutn ant-btn"
              type="submit"
              value="Submit"
            />
          </form>
        </Modal>
      </div>
    );
  }
}

export default QuestionCard;
