'use strict';

/*
** Survey Page View Compoenent.
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from 'components/Header';
import QuestionBox from 'components/QuestionBox';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuestions, fetchQuestionToDisplay } from 'actions/QuestionsActions';

import './styles.scss';

// map the redux state to the component props.
function mapStateToProps(state) {
  return {
    questions: state.questions
  }
}

// map the actions to the component props.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuestions,fetchQuestionToDisplay}, dispatch);
}

class Survey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentQuestionId: '',
      repeatSurvey: false
    }

    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.repeatSurvey = this.repeatSurvey.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.questions && nextProps.questions.current) {
      if(Object.keys(nextProps.questions.current).length > 0 &&
        nextProps.questions.current.id !== this.state.currentQuestionId) {
          this.setState({ loading: false, currentQuestionId: nextProps.questions.current.id });
      }
    }
  }

  componentDidMount() {
    this.startSurvey();
  }

  startSurvey() {
    let { props } = this;
    props.fetchQuestions().then( props.fetchQuestionToDisplay );
  }

  repeatSurvey() {
    this.setState( { loading: true, repeatSurvey: false } );
    this.startSurvey();
  }

  showNextQuestion() {
    let { questions } = this.props;
    if( questions.unanswered.length <= 0 ){
      this.setState( { repeatSurvey: true, currentQuestionId: '' } );
    } else {
      this.props.fetchQuestionToDisplay();
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading">
          <i class="fas fa-spinner fa-pulse fa-8x"></i>
        </div>
      );
    }

    const questionBoxProps = {
      ...this.props.questions, showNextQuestion: this.showNextQuestion
    };

    const repeatSurveyButton = (
      <div className="repeat-survey">
        <div class="survey-button" onClick={() => this.repeatSurvey() }>Repeat Survey</div>
      </div>
    );

    return (
      <div className="survey">
        <Header />
        <ReactCSSTransitionGroup
            className="question-box-container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}
            transitionAppear
            transitionAppearTimeout={700}
          >
          {
            this.state.repeatSurvey ? repeatSurveyButton : <QuestionBox {...questionBoxProps } />
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Survey);
