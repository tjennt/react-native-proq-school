// IMPORT HELPERS
import * as HelperService from '../../HelperService';

// IMPORT PARAMETER
import * as PARAMETER from '../../../constants/Parameter';

import axios from 'axios';

// LIST SEASONS
export const getListSeasons = async (props)=> {
    const { user } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/staff/season/`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            return { seasons: data.payload }
        }else {
            return {}
        }

    } catch (error) {
        console.log(error)
        return {}
    }
}

// LIST SUBJECTS
export const getListSubjects = async (props)=> {
    const { user, seasonId } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/student/schedules/${seasonId}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            return { subjects: data.payload, loading: false, stopLoad: false }
        }else {
            return { loading: false, stopLoad: false }
        }

    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}

// LIST SCHEDULE CLASS SUBJECT
export const getListScheduleDetail = async (props)=> {
    const { user, subjectScheduleId } = props
    try {
        let res = await axios.get(`${PARAMETER.SERVER}/v1/student/schedules/detail/${subjectScheduleId}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        let { data } = res
        if (data.success) {
            return { schedulesSubject: data.payload, loading: false, stopLoad: false }
        }else {
            return { loading: false, stopLoad: false }
        }

    } catch (error) {
        console.log(error)
        return { loading: false, stopLoad: false }
    }
}