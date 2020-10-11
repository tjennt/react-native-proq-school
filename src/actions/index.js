import * as USER_ACTION from './UserActions';

// ACTION USER
export const addUser = (user) => ({type:USER_ACTION.ADD_USER, user: user})
export const deleteUser = () => ({type:USER_ACTION.DELETE_USER})
