import { ADD_NEW_QUESTION, ANSWERED_QUESTION, SHOW_QUESTIONS } from "./actions";
import { formatQuestion } from "../../Utils/_DATA";
import { _saveQuestion, _saveQuestionAnswer } from "../../Utils/_DATA"

export function showQuestions(questions) {
  return {
    type: SHOW_QUESTIONS,
    questions
  };
}
export function addNewQuestion( question) {
  return {
    type: ADD_NEW_QUESTION,
    payload: question
  };
}

export function AnsweredQuestion({authUser, queId, answer}) {
  return {
    type: ANSWERED_QUESTION,
    payload:{authUser, queId, answer}
  };
}
function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


export function handleSubmitAnswer(data){
  debugger
  return (dispatch) => {
      dispatch(AnsweredQuestion(data))
      return _saveQuestionAnswer(data)
      .then(res => {})
      .catch((e) =>{
        dispatch(AnsweredQuestion(data))
      })
  }
}
/*export function handleCreateQuestion(optionOneText, optionTwoText) {
  return function (dispatch, getState) {
   const author = getState().authUser;
   const question = {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  };

  dispatch(addNewQuestion(question));
  }
}*/
