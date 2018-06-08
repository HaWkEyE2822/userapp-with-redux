import { combineReducers } from 'redux';
import  users  from './users_reducer';
import { reducer as formReducer } from 'redux-form';
import { CREATE_USERS } from '../actions/action';

const rootReducer = combineReducers({
    users,
    form: formReducer.plugin({
        UserForm: (state, action) => { 
          switch(action.type) {
            case CREATE_USERS:
              return undefined;      
            default:
              return state;
          }
        }
      })
})

export default rootReducer;