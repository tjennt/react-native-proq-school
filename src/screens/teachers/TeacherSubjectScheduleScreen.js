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
import ListScheduleTeacherComponent from '../../components/schedule/ListScheduleTeacherComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { DAYS } from '../../constants/Data';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

export default class TeacherSubjectScheduleScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('data').subject.name.toUpperCase()} - ${navigation.getParam('data').class.name}`,
    headerTitleAlign: 'left',
    headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
    headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
  })

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
    
    // Selected day
    this.setState({
      selectedDay: index
    })
  }

  viewListScheduleOrEmptyData = ()=> {
    const { navigation } = this.props

    if (navigation.getParam('data').listDays.length == 0) {
      return (
        <EmptyData />
      )
    }
    return (
      <ListScheduleTeacherComponent
        data={navigation.getParam('data')}
        navigation={navigation}
        screenName='TeacherSubjectScheduleClassScreen'
      />
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        {/* <View style={ styles.ViewListDays }>
          <ListDaysComponent 
            days={ DAYS }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          />
        </View> */}
        
        { this.viewListScheduleOrEmptyData() }
      
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