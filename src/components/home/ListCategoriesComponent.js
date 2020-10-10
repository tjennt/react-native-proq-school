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

export default class ListNewsComponent extends Component {
    render () {
        const { categories, getNews, buttonStyleSeleted } = this.props;
        return (
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              {
                categories.map((category, index)=> (
                  <Button
                      title= { category.title }
                      style={ styles.Button }
                      buttonStyle={ buttonStyleSeleted(index) }
                      onPress={ ()=> { getNews(category.id, index) } }
                  ></Button>
                ))
              }
              
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 15
    },
    ScrollView: {
      marginHorizontal: 10,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50
    }
  });