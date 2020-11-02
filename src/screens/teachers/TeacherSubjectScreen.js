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
import ListTimeComponent from '../../components/subject/ListTimeComponent';
import ListClassComponent from '../../components/class/ListClassComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { TIME_TEACHER } from '../../constants/Data';

export default class TeacherSubjectScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: 1
    }
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedDay) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }
  getSubject = (day, index) => {
    this.setState({
      selectedDay: index
    })
  }

  render() {
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        
        <View style={ styles.ViewListTime }>
          
          <ListTimeComponent 
            time={ TIME_TEACHER }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getSubject={ this.getSubject }
          />

        </View>
        
        <ListClassComponent
          navigation={ this.props.navigation }
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
  ViewListTime: {
    paddingTop: 10
  }
});