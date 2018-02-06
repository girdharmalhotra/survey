/*
** Reducer to handle the state of the Loaded Questions across the app
*/

const initialState = {
  unanswered: [],
  current: {},
  count: 0,
  error: false,
  errorMessage: ''
};

// Questions Reducer
export const QuestionsReducer = (state = initialState, action) => {
  const currentState = state; // current app state.
  switch (action.type) {
    case 'FETCH_QUESTIONS_SUCCESS':
      const allQuestions = action.payload.data;
      return { ...currentState, unanswered: allQuestions, totalCount: allQuestions.length };
    case 'FETCH_QUESTION_TO_DISPLAY': // fetch a random question from the unaswered.
      const questionIndex = Math.floor(Math.random() * currentState.unanswered.length);
      const currentQuestion = currentState.unanswered[questionIndex];
      const remainingUnanswered = [...currentState.unanswered.slice(0,questionIndex),...currentState.unanswered.slice(questionIndex+1)];
      const count = currentState.count < currentState.totalCount ? ++currentState.count : 1;
      return { ...currentState, unanswered: remainingUnanswered, current: currentQuestion, count: count };
    case 'FETCH_QUESTIONS_FAILURE':
      return {...currentState, error: true, errorMessage: 'API call failed!'};
    default:
      return state;
  }
}
