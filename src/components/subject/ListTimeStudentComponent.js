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

export default class ListTimeStudentComponent extends Component {
    render () {
        const { seasons, getSubject, buttonStyleSeleted } = this.props;
        return (
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              
              {
                seasons.map((season, index)=> (
                  <Button
                      title= { season.name }
                      titleStyle={ [GLOBAL_STYLES.ButtonStyle] }
                      buttonStyle={ buttonStyleSeleted(index) }
                      onPress={ ()=> { getSubject(season._id, index) } }
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