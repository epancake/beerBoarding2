import React, { useState } from 'react';
import Highlight from 'react-highlight';
import { Card, Icon, Button, Modal } from 'antd';
import './Questions.scss';

const QuestionCard = ({ question, updateQuestion, deleteQuestion }) => {
  const [toggleAnswer, toggleFunction] = useState(true);
  const [modalIsOpen, toggleModal] = useState(false);
  const [deleteModalIsOpen, toggleDeleteModal] = useState(false);

  const onSubmitUpdate = e => {
    e.preventDefault();
    toggleModal(!modalIsOpen);

    const form = e.target;
    const data = new FormData(form);
    const question = {
      id: data.get('qid'),
      question_name: data.get('qname'),
      question: data.get('qtext'),
      solution: data.get('solution'),
      submitter: data.get('submitter'),
      difficulty: data.get('difficulty')
    };

    updateQuestion(question);
  };

  const handleDelete = e => {
    deleteQuestion(question.id);
    toggleDeleteModal(!deleteModalIsOpen);
  };

  return (
    <div key={question.id}>
      <Card>
        <h3>
          {question.id}. {question.question_name}
          <p className="difficulty">
            Difficulty:{' '}
            {question.difficulty ? question.difficulty : 'Not yet rated'}
          </p>
        </h3>
        <p>Question: {question.question}</p>
        <p>Submitted By: {question.submitter}</p>

        <h4 className="solution" onClick={() => toggleFunction(!toggleAnswer)}>
          Solution <Icon type={toggleAnswer ? 'caret-down' : 'caret-up'} />{' '}
        </h4>
        <Highlight
          language="javascript"
          className={toggleAnswer ? 'hidden solutionLine' : 'solutionLine'}
        >
          {question.solution}
        </Highlight>
        <div className="card-buttons">
          <Button
            id="update"
            onClick={() => toggleModal(!modalIsOpen)}
            type="primary"
          >
            Update <Icon type="edit" />
          </Button>
          <Button
            id="delete"
            onClick={() => toggleDeleteModal(!deleteModalIsOpen)}
            type="primary"
          >
            Delete <Icon type="delete" />
          </Button>
        </div>
      </Card>

      <Modal
        visible={modalIsOpen}
        isOpen={modalIsOpen}
        onRequestClose={() => toggleModal(!modalIsOpen)}
        onCancel={() => toggleModal(!modalIsOpen)}
        footer={null}
        contentLabel="Update Modal"
      >
        <h3>Update the question</h3>
        <p className="updateInstr">
          Fill in all the fields and the question will be updated.
        </p>
        <form className="addform" id="form" onSubmit={onSubmitUpdate}>
          <label className="add qid-label hidden" htmlFor="qid">
            Question ID:
          </label>
          <input
            className="add qid-field hidden"
            type="text"
            name="qid"
            defaultValue={question.id}
          />
          <label className="add qname-label" htmlFor="qname">
            Question Name:
          </label>
          <input
            className="add qname-field"
            type="text"
            name="qname"
            defaultValue={question.question_name}
          />
          <label className="add qtext-label" htmlFor="qtext">
            Question:{' '}
          </label>
          <textarea
            className="add qtext-field"
            name="qtext"
            rows="5"
            defaultValue={question.question}
          />
          <label className="add sname-label" htmlFor="solution">
            Solution:{' '}
          </label>
          <textarea
            className="add sname-text"
            name="solution"
            rows="5"
            defaultValue={question.solution}
          />
          <label className="add subm-label" htmlFor="submitter">
            Your First and Last Name:
          </label>
          <input
            className="add subm-text"
            type="text"
            name="submitter"
            defaultValue={question.submitter}
          />
          <label className="add difficulty-label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            className="add difficulty-text"
            type="text"
            name="difficulty"
            defaultValue={question.difficulty}
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

      <Modal
        visible={deleteModalIsOpen}
        isOpen={deleteModalIsOpen}
        onRequestClose={() => toggleDeleteModal(!deleteModalIsOpen)}
        onOk={handleDelete}
        onCancel={() => toggleDeleteModal(!deleteModalIsOpen)}
        contentLabel="Delete Modal"
      >
        <h3>Are you sure you want to delete {question.name}?</h3>
      </Modal>
    </div>
  );
};

export default QuestionCard;
