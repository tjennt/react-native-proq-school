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

import STYLE_GOBAL from '../../styles';

// IMPORT HEADER
import Header from '../../components/headers/DefaultHeaderComponent';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../../constants/Locale';

import * as COLORS from '../../constants/Colors';
import Constants from 'expo-constants';

// IMPORT LOADER
import LoaderListNewsComponent from '../../components/loader/LoaderListNewsComponent';

export default class NewDetailScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  render() {
    // const { title } = this.state;
    return (
    //   <View style={{ backgroundColor: COLORS.LIGHT }}>
        /* <Header title={ title } /> */
        <Text>NAVIGAGA</Text>
      /* </View> */
    )
  }
}

const styles = StyleSheet.create({

});