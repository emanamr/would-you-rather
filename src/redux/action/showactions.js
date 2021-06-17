import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer

} from "../../Utils/api";


import {
  showQuestions,
  addNewQuestion,
  AnsweredQuestion
} from "./questionaction";

import { showUsers, addQuestionToUser,  } from "./useractions";
import { showLoading, hideLoading } from "react-redux-loading";



export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(showUsers(users));
      dispatch(showQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

// add new question to user
export function handleSaveQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();

    return saveQuestion({ optionOneText, optionTwoText, author: authUser })
      .then((question) => {
        dispatch(addNewQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

// save answer to user
export function handleSaveAnswer(info) {
  return (dispatch) => {
    dispatch(AnsweredQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in saving answer: ", e);
    });
  };
}
/*export function handleSubmitAnswer(data){
    debugger
    return (dispatch) => {
        dispatch(AnsweredQuestion(data))
        dispatch(showLoading())
        return _saveQuestionAnswer(data)
        .then(res => {dispatch(hideLoading())})
        .catch((e) =>{
          console.warn('Error in handleSubmitAnswer: ', e)
          dispatch(AnsweredQuestion(data))
          dispatch(hideLoading())
          alert('The was an error on submitting answwer. Try again.')
        })
    }
}*/