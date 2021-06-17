import { ADD_USER_ANSWER, ADD_USER_QUESTION, SHOW_USERS } from "./actions";

export function showUsers(users) {
  return {
    type: SHOW_USERS,
    users
  };
}
export function addQuestionToUser(question) {
  return {
    type: ADD_USER_QUESTION,
    payload:question
  };
}

export function addAnswerToUser({ authUser, queId, answer }) {
  return {
    type: ADD_USER_ANSWER,
    payload:{authUser, queId, answer}
  };
}
