// IMPORT HELPERS
import * as HelperService from '../../HelperService';

// IMPORT PARAMETER
import * as PARAMETER from '../../../constants/Parameter';

import axios from 'axios';

// LIST SCHEDULE STUDENT
export const getListSchedule = async (props)=> {
    const { user, day } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/student/schedules`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                date: day.value
            }
        })
        let { data } = res
        if (data.success) {
            return { listSchedules: data.payload, loading: false, stopLoad: false }
        }else {
            return { loading: false, stopLoad: false }
        }

    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}
