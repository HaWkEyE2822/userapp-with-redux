import { FETCH_USERS, CREATE_USERS, EDIT_USER, DELETE_USER } from '../actions/action';
const InitialState = {
                        items: []
                    };

export default function users(state=InitialState, action={}){
    switch(action.type){
        case FETCH_USERS:
            return { ...state, items: action.payload}
        case CREATE_USERS:
            let newState = { ...state, items: [...state.items]}
            return newState;
        case EDIT_USER:
            return  { ...state }
        case DELETE_USER:
            return { ...state }
        default:
            return state;
    }

}