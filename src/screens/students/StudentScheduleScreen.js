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
import ListScheduleComponent from '../../components/schedule/ListScheduleComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { DAYS } from '../../constants/Data';
export default class StudentScheduleScreen extends React.Component {
  
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
    console.log('hello')
  }

  render() {
    return (
      <View style={{ backgroundColor: COLORS.LIGHT }}>
        <View style={ styles.ViewListDays }>
          <ListDaysComponent 
            days={ DAYS }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          />
        </View>
        <ScrollView style={{ height: 550 }}>
          <ListScheduleComponent />
        </ScrollView>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonStyle: {
    borderRadius: 50,
    backgroundColor: '#cccccc'
  },
  ButtonStyleSelected: {
    borderRadius: 50,
    backgroundColor: '#606060'
  },
  ViewListDays: {
    paddingTop: 10
  }
});