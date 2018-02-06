'use strict';

/*
** Answers Compoenent.
*/

import React from 'react';
import classNames from 'classnames';

function Answers(props) {
  let { answerChoosen,options,onAnswerSelected } = props;

  const answers = options.map( (option,idx) => {
    // Classes to apply to the answer options depending if the the answer has been choosen.
    let answerOptionClass = classNames({
      'answer-option': true,
      'selected': option.id.toString() === answerChoosen.toString(),
      'disabled': option.id.toString() !== answerChoosen.toString() && answerChoosen.toString() !== ''
    });
    // show the selected count only once answer is chosen.
    let showCountClass = classNames({
      'answer-count': true,
      'active': answerChoosen.toString() !== ''
    });
    
    return(
      <li key={idx} className={answerOptionClass} onClick={() => { onAnswerSelected(option.id)} }>
        {option.answer}
        <span className={showCountClass}> (Selected: {option.count} times) </span>
      </li>
    );
  });

  return (
    <ul className="answers">
      {answers}
    </ul>
  );

}

Answers.propTypes = {
  options: React.PropTypes.array.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired
};

export default Answers;
