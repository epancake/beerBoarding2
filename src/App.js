import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from './store'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Questions from './components/Questions'
import QuestionForm from './components/QuestionForm'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Welcome} />
            <Route path="/questions" component={Questions} />
            <Route path="/addquestion" component={QuestionForm} />

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
