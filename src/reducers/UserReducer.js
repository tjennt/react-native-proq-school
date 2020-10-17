import * as USER_ACTION from '../actions/UserActions';

const user = {
    token: null,
    email: null,
    studentCode: null,
    userName: null,
    fullName: null,
    avatar: null,
    className: null,
    role: null
};

export default (state = user, action) => {
  
    switch (action.type) {

    case USER_ACTION.ADD_USER:

        return {...state, 
            token: action.user.token,
            email: action.user.email,
            studentCode: action.user.studentCode,
            userName : action.user.userName, 
            fullName : action.user.fullName, 
            avatar: action.user.avatar,
            className: action.user.className,
            role: action.user.role
        };
        
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