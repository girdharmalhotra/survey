/*
** Redux Actions for /answers & /answers/:id.
*/

export const updateAnswerCount = (id, data) => {
  return {
    types: ['UPDATE_ANSWER_COUNT','UPDATE_ANSWER_COUNT_SUCCESS','UPDATE_ANSWER_COUNT_FAILURE'],
    payload: {
      request: {
        method: 'put',
        url: '/answers/'+id,
        data: data
      }
    }
  }
}
