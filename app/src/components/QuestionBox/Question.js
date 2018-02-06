'use strict';

/*
** A simple question component to show the question count and text.
*/

import React from 'react';

function Question(props) {
  return (
    <div className="question-wrapper">
      <div className="icon">
        <i className="fas fa-question"></i>
      </div>
      <div className="question">
        <div className="count">
          Question <span>{props.count}</span> of <span>{props.totalCount}</span>
        </div>
        <h2>{props.question}</h2>
      </div>
    </div>
  );
}

Question.propTypes = {
  count: React.PropTypes.number.isRequired,
  totalCount: React.PropTypes.number.isRequired,
  question: React.PropTypes.string.isRequired
};

export default Question;
