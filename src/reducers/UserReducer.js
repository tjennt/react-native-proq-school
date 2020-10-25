import * as USER_ACTION from '../actions/UserActions';

const user = {};

export default (state = user, action) => {
  
    switch (action.type) {

    case USER_ACTION.ADD_USER:

        return state = action.user;
        
    case USER_ACTION.DELETE_USER:

        return {...state, 
            token : null, 
            email: null,
            studentCode: null,
            userName : null, 
            fullName : null, 
            avatar: null,
            className: null,
            role: null
        };

    default:
        return state;
  }

}