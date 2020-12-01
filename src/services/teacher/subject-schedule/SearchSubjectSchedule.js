import * as HelperService from '../../HelperService';

export class SearchSubjectSchedule {
    
    static getDateRangeClassSubject (arrDate = []) {
        
        let arrDay = [];
        
        arrDay.push({
            id: 7,
            label: 'Tất cả',
            checkAll: true
        })

        arrDate.map((day)=> {
            arrDay.push({
                id: day,
                label: HelperService.getDateName(day, 'day'),
                checkAll: false
            })
        })
        
        return arrDay
    }

    static getListSubjectScheduleSortDay (data = [], day = {}) {

        let results = []
        if (day.checkAll == true) {
            return data
        }

        data.map( (date) => {
            let dateId = HelperService.getDayNumber(date)
            if (
                dateId == parseInt(day.id)
            ) {
                results.push(date)
            }
        })
        
        return results
    }
     
}
