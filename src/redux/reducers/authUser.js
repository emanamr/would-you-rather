import {AUTH_USER ,  AUTH_LOGOUT } from "../action/actions";



export default function authUser(state = null, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.id;
    case AUTH_LOGOUT:
      return "";
    default:
      return state;
  }
}

/*import { USER_LOGIN, USER_LOGOUT } from "../actions/actionIdentifiers";

const initialState = 'johndoe'

export default function currentUser(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload.currentUser
        case USER_LOGOUT:
            return initialState
        default:
            return state
    }
}*/
