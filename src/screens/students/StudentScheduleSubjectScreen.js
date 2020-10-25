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
export default class StudentScheduleSubjectScreen extends Component {

  render() {
    return (
      <View>
        {/* <ScrollView style={{ height: 550 }}>
          <ListScheduleComponent />
        </ScrollView> */}
        <Text>HELdLo</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});