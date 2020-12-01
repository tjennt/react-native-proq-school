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

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';
import STYLE_GOBAL from '../../styles';

export default class ListNewsComponent extends Component {
    render () {
        const { categories, getNews, buttonStyleSeleted } = this.props;
        return (
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              {
                Object.keys(categories).map((key, index)=> (
                  <Button
                      title= { PARAMETER.TYPE_NOTIFY[key] }
                      titleStyle={[STYLE_GOBAL.ButtonStyle ]}
                      buttonStyle={ buttonStyleSeleted(index) }
                      onPress={ ()=> { getNews(key, index) } }
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
      borderBottomRightRadius: 50
    }
  });