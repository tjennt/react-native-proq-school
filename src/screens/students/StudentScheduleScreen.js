import React, { Component } from 'react';
import { 
    View,
    StyleSheet
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

// IMPORT DATA
import { Days } from '../../constants/Data';
export default class StudentScheduleScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: null
    }
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedDay) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  render() {
    return (
      <View style={STYLE_GOBAL.container}>
        <ListDaysComponent 
          days={ Days }
          buttonStyleSeleted={ this.buttonStyleSeleted }
          getScheduleDays={ this.getScheduleDays(day.id, index) }
        />
        <Text>ScheduleScreen</Text>
      
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
  }
});