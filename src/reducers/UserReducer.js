import * as USER_ACTION from '../actions/UserActions';

const user = {};

export default (state = user, action) => {
  
    switch (action.type) {

    case USER_ACTION.ADD_USER:

        return state = action.user;
        
    case USER_ACTION.DELETE_USER:

        return state = {};

    default:
        return state;
  }

}