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
import ListScheduleSubjectStudentComponent from '../../components/subject/ListScheduleSubjectStudentComponent';

import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

// IMPORT DATA
import { DAYS } from '../../constants/Data';
export default class StudentScheduleSubjectScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `LỊCH HỌC MÔN ${navigation.getParam('title')} `,
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.LIGHT 
    },
    headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
  })
  
  componentDidMount() {
    const {setParams} = this.props.navigation;
    setParams({ title: 'PHP' })
  }

  render() {
    
    return (
      <View style={ {flex:1} }>
        <ListScheduleSubjectStudentComponent />
      </View>
    )
  }
}

const styles = StyleSheet.create({

});