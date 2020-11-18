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
import ListScheduleStudentComponent from '../../components/schedule/ListScheduleStudentComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { DAYS } from '../../constants/Data';
export default class StudentScheduleScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: 0
    }
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedDay) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }
  getScheduleDays = (day, index) => {
    this.setState({
      selectedDay: index
    })
  }

  render() {
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        <View style={ styles.ViewListDays }>
          {/* <ListDaysComponent 
            days={ DAYS }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          /> */}
        </View>

        <ListScheduleStudentComponent />
      
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