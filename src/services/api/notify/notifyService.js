// IMPORT HELPERS
import * as HelperService from '../../HelperService';

// IMPORT PARAMETER
import * as PARAMETER from '../../../constants/Parameter';

import axios from 'axios';

// LIST CREATE GROUP AFTER GET ALL CHAT
export const getTypeNotify = async (props)=> {
    const { user } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/staff/type-notify/`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            return { categories: data.payload, loadingCategories: false }
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const getNotifyByType = async (props)=> {
    const { user, url_type } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/staff/notify/${url_type}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res

        if(data.success) {
            return {
                news: data.payload,
                loadingNews: false
            }
        }

        return {}

      } catch (error) {
            console.log(error)
            return {}
      }
}