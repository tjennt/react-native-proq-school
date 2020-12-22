// IMPORT HELPERS
import * as HelperService from '../../HelperService';

// IMPORT PARAMETER
import * as PARAMETER from '../../../constants/Parameter';

import axios from 'axios';

// LIST CREATE GROUP AFTER GET ALL CHAT
export const getGroupOrCreate = async (props)=> {
    const { user, userIdSend, params } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/group/${userIdSend}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: params
        })
        let { data } = res
        if (data.success) {
            let dataChat = await getChats({
                group: data.payload,
                user: user
            })
            return {
                dataRoom: data.payload,
                messages: dataChat.payload,
                total_page: dataChat.total_page,
                page: dataChat.page,
            }
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const createGroupChat = async (props)=> {
    const { user, userIds, name } = props
    try {
        let res = await axios.post(`${PARAMETER.SERVER}/v1/group/multi`, {
            name: name,
            mems: userIds
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            let dataChat = await getChats({
                group: data.payload,
                user: user
            })
            return {
                dataRoom: data.payload,
                messages: dataChat.payload,
                total_page: dataChat.total_page,
                page: dataChat.page,
            }
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const getChats = async (props)=> {
    const { group, user, params } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/message/${group._id}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: params
        })
        let { data } = res
        if (data.success) {
            return {
                payload: data.payload,
                total_page: data.total_page,
                page: data.page
            }
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const postChat = async (props)=> {
    const { groupId, content, user } = props
    try {
        let res = await axios.post(`${PARAMETER.SERVER}/v1/message/${groupId}`, {
            content: content
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            return data.payload
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const getListGroupUser = async (props)=> {
    const { user } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/group/`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            if(data.payload.length == 0){
                return { loading: false, stopLoad: false }
            }
            return { users: data.payload, loading: false, stopLoad: true }
        }else {
            return { loading: false, stopLoad: false }
        }
    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}

// Search user
export const getListUserSearch = async (props)=> {
    const { user, searchText } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/users/search`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                text: searchText,
                limit: 20
            }
        })

        let { data } = res
        if (data.success) {
            if(data.payload.length == 0) {
                return { users: data.payload, loading: false, stopLoad: false }
            }

            let users = data.payload.map((user)=> {
                user['checked_group'] = false
                return user
            })

            return { users: users, loading: false, stopLoad: false }
        }else {
            return { loading: false, stopLoad: false }
        }
    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}

// MAP MESSAGES
export const mapMessages = (messages, options = {})=> {
    
    if(options.type == 'single'){
        return messages.map((message)=> {
        return {
            _id: message._id,
            text: message.content,
            createdAt: message.createdAt,
            user: {
            _id: message.from,
            name: message.from == options.id ? options.fullName : message.from,
            avatar: `https://i.ibb.co/jDGCmrN/user.jpg`,
            },
            sent: true
        }
        })
    }

    return messages.map((message)=> {
        return {
          _id: message._id,
          text: message.content,
          createdAt: message.createdAt,
          user: {
            _id: message.from,
            name: message.from,
            avatar: `https://i.ibb.co/jDGCmrN/user.jpg`,
          },
          sent: true
        }
      })
}

export const mapMessage = (message)=> {
    return {
        _id: message._id,
        text: message.content,
        createdAt: message.createdAt,
        user: {
            _id: message.from,
            name: message.from,
            avatar: `https://i.ibb.co/jDGCmrN/user.jpg`,
        },
        sent: false
    }
}