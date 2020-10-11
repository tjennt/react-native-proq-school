import * as USER_ACTION from '../actions/UserActions';

const user = {
    token: null,
    userName: null,
    fullName: null,
    avatar: null,
    role: null
};

export default (state = user, action) => {
  
    switch (action.type) {

    case USER_ACTION.ADD_USER:

        return {...state, 
            token: action.user.token,
            userName : action.user.userName, 
            fullName : action.user.fullName, 
            avatar: action.user.avatar,
            role: action.user.role
        };
        
    case USER_ACTION.DELETE_USER:

        return {...state, 
            token : null, 
            userName : null, 
            fullName : null, 
            avatar: null,
            role: null
        };

    default:
        return state;
  }

}