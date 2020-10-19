import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator } from 'react-native';
  
  import { Button, 
    Text, 
    ThemeProvider, 
    ListItem, 
    Avatar, 
    SearchBar } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

export default class ListDaysComponent extends Component {
    render () {
        const { days, getScheduleDays, buttonStyleSeleted } = this.props;
        return (
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              
              {
                days.map((day, index)=> (
                  <Button
                      title= { day.label }
                      buttonStyle={ buttonStyleSeleted(index) }
                      onPress={ ()=> { getScheduleDays(day.id, index) } }
                  ></Button>
                ))
              }
              
              
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
      marginHorizontal: 10,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: COLORS.LIGHT
    }
  });