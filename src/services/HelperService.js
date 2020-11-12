
// get date now parse to iso string
export const getDateNow = ()=> {
    return new Date().toISOString()
}

export const getDateFormat = (date, format = 'date_time_year')=> {
    
    if ( typeof date == 'undefined') {
        return ''
    }
    
    let dateObj = new Date(date)
    let month = dateObj.getMonth() + 1
    let day = String(dateObj.getDate()).padStart(2, '0')
    let year = dateObj.getFullYear()
    
    let result;

    switch(format) {
        case 'date_time':
            result = day  + '/'+ month 
        break
        case 'month_day_year':
            result = month + '-' + day + '-'+ year 
        break
        default: 
            result = day  + '/'+ month  + '/' + year
        break
    }

    return result
}

export const getDateName = (date)=> {
    let day = new Date(date).getDay()
    let result

    switch(day){
        case 0:
            result = 'Chủ nhật'
        break
        default:
            result = `Thứ ${++day}`
        break
    }
    return result
}