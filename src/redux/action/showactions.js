import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer

} from "../../Utils/api";

import { _saveQuestion} from "../../Utils/_DATA"
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
/*export function handleSaveQuestion(optionOneText, optionTwoText) {
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
*/
// save answer to user
export function handleSaveAnswer(info) {
  return (dispatch) => {
    dispatch(AnsweredQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in saving answer: ", e);
    });
  };
}
export function handleSaveQuestion(question) {
  
    return (dispatch) => {
        dispatch(showLoading())
        
        return _saveQuestion(question)
        .then(ques => {
        
            dispatch(addNewQuestion(ques))
            dispatch(hideLoading())
        })
        .catch((e) =>{
           
            console.warn('Error in handleSaveQuestion: ', e)
            dispatch(hideLoading())
            alert('The was an error on submitting question. Try again.')
          })

    }
}