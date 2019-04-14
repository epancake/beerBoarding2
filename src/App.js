import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from './components/Welcome'
import Header from './components/Header'
import QuestionsContainer from './components/QuestionsContainer'
import QuestionForm from './components/QuestionForm'

class App extends Component {

  render() {
    return (
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Welcome} />
            <Route path="/questions" component={QuestionsContainer} />
            <Route path="/addquestion" component={QuestionForm} />

          </div>
        </Router>
    );
  }
}

export default App;
