// IMPORT HELPERS
import * as HelperService from '../HelperService';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

import axios from 'axios';

export const getListScheduleApi = async (props)=> {
    const { user, day } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/teacher/schedules/`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                date: day.value
            }
        })
        let { data } = res
        if (data.success) {
            return { listDays: data.payload, loading: false, stopLoad: false }
        }else {
            return { loading: false, stopLoad: false }
        }

    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}