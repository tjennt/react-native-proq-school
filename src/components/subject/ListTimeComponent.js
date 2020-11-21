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

import GLOBAL_STYLES from '../../styles';

export default class ListTimeComponent extends Component {
    render () {
        const { time, getSubject, buttonStyleSeleted } = this.props;
        return (
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              
              {
                time.map((day, index)=> (
                  <Button
                      title= { day.label }
                      titleStyle={ [GLOBAL_STYLES.ButtonStyle] }
                      buttonStyle={ buttonStyleSeleted(index) }
                      onPress={ ()=> { getSubject(day.id, index) } }
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