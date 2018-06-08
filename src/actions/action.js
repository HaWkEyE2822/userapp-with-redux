import axios from 'axios';
export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_USERS = 'CREATE_USERS';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

const URL = 'http://localhost:3001/api/'

export const createUserSuccess = (values) => {
  return {
    type: CREATE_USERS,
    values
  }
}

export function fetchedUsersSuccessfully(users){
  return{
  type: FETCH_USERS,
  payload: users
  }
 }

export function fetchUsers(){
    return (dispatch) => {
        dispatch(fetchUserRequest());
        return axios.get(`${URL}userdata`)
            .then(userlist => dispatch(fetchedUsersSuccessfully(userlist.data)))
            .catch(err => dispatch({type: 'ERROR', payload: err}))
    }
}

export function addUser(values){
  return (dispatch) => {
       dispatch(createUserRequest());
    return axios.post(`${URL}adduser`, values)
      .then(response => dispatch(createUserSuccess(response.data)))
      .catch(err => dispatch(createUserFailed(err)))
  }
}

export function editUser(id){
  return(dispatch) => {
    dispatch({type: 'START_EDIT_REQUEST'})
    return axios.post(`${URL}edituser`, id)
      .then(response => dispatch({type: EDIT_USER, payload: response.data}))
      .catch(err => dispatch({type: 'EDIT_REQUEST_FAILED'}))
  }
}

export function deleteUser(id){
  return(dispatch) => {
    dispatch({type: 'START_DELETE_REQUEST'})
    return axios.post(`${URL}deluser`, id)
      .then(response => dispatch({type: DELETE_USER, payload: response.data}))
      .catch(err => dispatch({type: 'DELETE_REQUEST_FAILED'}))
  }
}


export function fetchUserRequest(){
 return{
 type: 'FETCH_REQUEST',
 }
}
export const createUserRequest = () => {
  return {
    type:'CREATE_USER_REQUEST'
  }
}

export const createUserFailed = (message) => {
    return {
      type:'CREATE_USER_REQUEST_FAILED',
      message
    }
  }


  





  
  