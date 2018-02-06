/*
** Redux Actions for /questions & /question/:id.
*/

export const fetchQuestions = () => {
  return {
    types: ['FETCH_QUESTIONS','FETCH_QUESTIONS_SUCCESS','FETCH_QUESTIONS_FAILURE'],
    payload: {
      request: {
        url: '/questions'
      }
    }
  }
}

export const fetchQuestionToDisplay = () => {
  return {
    type: 'FETCH_QUESTION_TO_DISPLAY'
  }
}
