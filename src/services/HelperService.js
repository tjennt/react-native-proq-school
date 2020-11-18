import { AsyncStorage } from 'react-native';

/**
 * Save in AsyncStorage 
 * @param {key, value} data
 * @returns boolean
 */
export const _storeData = async (data) => {
    try {
      
        await AsyncStorage.setItem(
            data.key,
            data.value
        );
        return true

    } catch (error) {
        console.log(error)
        return false
    }
};

/**
 * Get by key AsyncStorage 
 * @param key
 * @returns value
 */
export const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value != null) {
          return value
      }
      return null
    } catch (error) {
      console.log(error)
    }
};

export const _removeData = async (key) => {
    try {
        const value = await AsyncStorage.removeItem(key)
        return true
      } catch (error) {
          console.log(error)
          return false
      }
}
// get date now parse to iso string
export const getDateNow = ()=> {
    return new Date().toISOString()
}

// Format date
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

// Get name day viet nam
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

// Get date now to weekend
export const getDateNowToWeekend = ()=> {

    let now = new Date()

    let dateNowtoEndWeek = []

    dateNowtoEndWeek.push({
        label: 'Hôm nay',
        value: getDateFormat(now, 'month_day_year')
    })
    
    for(let i = now.getDay(); i <= 6; i++) {
        
        let date = getNextDate(now, i)
        dateNowtoEndWeek.push({
            label: getDateName(date),
            value: getDateFormat(date, 'month_day_year')
        })
    }
    return dateNowtoEndWeek
}

export const getNextDate = (date, number = 6)=> {
    let lastday = date.getDate() - (date.getDay() - 1) + number;
    return new Date(date.setDate(lastday));
}

export const isObjEmpty = (obj)=> {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}