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
import ListSubjectStudentComponent from '../../components/subject/ListSubjectStudentComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { TIME_STUDENT } from '../../constants/Data';

export default class StudentSubjectScreen extends Component {
  
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

    // console.log('hello')
  }

  render() {
    return (
      <View style={{ backgroundColor: COLORS.LIGHT }}>
        <View style={ styles.ViewListTime }>
          <ListTimeComponent 
            time={ TIME_STUDENT }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getSubject={ this.getSubject }
          />
        </View>
        <ScrollView style={{ height: 550 }}>
          <ListSubjectStudentComponent
            navigation={ this.props.navigation }
          />
        </ScrollView>
      
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