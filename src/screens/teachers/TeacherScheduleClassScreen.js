import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView
  } from 'react-native';

import { Button, 
    Text, 
    ThemeProvider, 
    ListItem, 
    Avatar, 
    SearchBar } from 'react-native-elements';

import STYLE_GOBAL from '../../styles/Global';

// IMPORT COMPONENTS
import ListDaysComponent from '../../components/schedule/ListDaysComponent';
import ListClassScheduleTeacherComponent from '../../components/schedule/ListClassScheduleTeacherComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { DAYS } from '../../constants/Data';

export default class TeacherScheduleClassScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      classSchedule: [
        {
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: true
        },
        {
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: false
        },{
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: false
        },{
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: true
        },{
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: false
        },{
          name: 'Nguyễn Tấn Tiền',
          studentCode: 'PS09110',
          avatar: 'iamge/sa/sasda.jpg',
          status: false
        },
      ]
    }
  }

  attendance = (item, index)=> {
    
    console.log(item, index)
    
    // Call api

  }

  render() {
    const { classSchedule } = this.state
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        
        <ListClassScheduleTeacherComponent 
          classSchedule={classSchedule}
          attendance={ this.attendance }
        />
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#cccccc'
  },
  ButtonStyleSelected: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: COLORS.MAIN_TEXT
  },
  ViewListDays: {
    paddingTop: 10
  }
});