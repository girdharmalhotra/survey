'use strict';

/*
** QuestionBox Component.
** Parent Wrapper Compoenent to handle the state of the each question.
*/

import React from 'react';
import _find from 'lodash/find';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAnswerCount } from 'actions/AnswerActions';

import Question from './Question';
import Answers from './Answers';
import './styles.scss';

// map the actions to the component properties.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateAnswerCount},dispatch);
}

class QuestionBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswerId : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState( {selectedAnswerId : ''} ); // reset state of the selected answer.
    }
  }

  // Update the state of the answer selected and request the next question.
  updateSelectedAnswerId(id) {
    this.setState({ selectedAnswerId: id },
    () => { setTimeout( this.props.showNextQuestion,1500); });
  }

  // update the count of the answer selected on the server.
  onAnswerSelected(id) {
    let currentQuestion = this.props.current;
    let answerSelected = _find(currentQuestion.answers, ['id', id]);
    const updatedAnswerCount = ++answerSelected.count;
    this.props.updateAnswerCount(id, { 'count': updatedAnswerCount} ).then( this.updateSelectedAnswerId(id) );
  }

  render() {
    let {selectedAnswerId} = this.state;
    let currentQuestion = this.props.current;

    return (
      <div className="question-box">
        <Question totalCount={this.props.totalCount} count={this.props.count} question={currentQuestion.question} />
        <Answers options={currentQuestion.answers} answerChoosen={selectedAnswerId} onAnswerSelected={this.onAnswerSelected.bind(this)} />
      </div>
    );
  }
}

export default connect(null,mapDispatchToProps)(QuestionBox);
