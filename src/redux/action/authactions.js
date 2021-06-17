import { AUTH_USER, AUTH_LOGIN, AUTH_LOGOUT } from "./actions";



export function authUser(id) {
  return {
    type: AUTH_USER,
    id
  };
}

export function authLogin(authUser) {
  return {
    type: AUTH_LOGIN,
    payload: {
      authUser
    }
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT
  };
}
 

export function handleUserLogin(){
  return function(dispatch, getState){
    const storedUserId = localStorage.getItem(AUTH_USER)
    if(storedUserId){
      dispatch(authUser(storedUserId))
    }
  }
}

export function handleUserLogout(){
  return function(dispatch, getState){
    localStorage.removeItem(AUTH_USER)
    dispatch(authLogout())
  }
}
