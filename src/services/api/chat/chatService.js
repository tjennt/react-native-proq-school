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
                messages: dataChat
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
            return data.payload
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



// MAP MESSAGES
export const mapMessages = (messages)=> {
  
    return messages.map((message)=> {
      return {
        _id: message._id,
        text: message.content,
        createdAt: message.createdAt,
        user: {
          _id: message.from,
          name: message.from,
          avatar: 'https://server-dev.asia/uploads/user-avatar/default.jpg',
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
            avatar: 'https://server-dev.asia/uploads/user-avatar/default.jpg',
        },
        sent: true
    }
}