import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, ThemeProvider, ListItem, Avatar, SearchBar } from 'react-native-elements';
import STYLE_GOBAL from '../styles';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';
import TestComponent from '../components/TestComponent';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../constants/Locale';

import * as COLORS from '../constants/Colors';


export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchLoading: false,
      categories: [],
      news: []
    }
  }

  componentDidMount() {
    this.setState({
      categories: [
        {
          id: 1,
          name: 'Thông báo'
        },
        {
          id: 1,
          name: 'Sự kiện'
        },
        {
          id: 1,
          name: 'Học phí'
        }
      ],
      news: [
        {
          id: 1,
          name: 'Thông báo đóng học phí',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 2,
          name: 'Thông báo đewqsdss',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 3,
          name: 'Thông báo Nghỉ học',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 4,
          name: 'Liên hoang trường đi',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 5,
          name: 'Hello mấy cưng',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 6,
          name: 'Nghỉ nha khỏi học hành gì hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 7,
          name: 'Học quan gi, nghỉ chấm hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 3,
          name: 'Thông báo Nghỉ học',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 4,
          name: 'Liên hoang trường đi',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 5,
          name: 'Hello mấy cưng',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 6,
          name: 'Nghỉ nha khỏi học hành gì hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 7,
          name: 'Học quan gi, nghỉ chấm hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 3,
          name: 'Thông báo Nghỉ học',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 4,
          name: 'Liên hoang trường đi',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 5,
          name: 'Hello mấy cưng',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 6,
          name: 'Nghỉ nha khỏi học hành gì hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 7,
          name: 'Học quan gi, nghỉ chấm hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 3,
          name: 'Thông báo Nghỉ học',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 4,
          name: 'Liên hoang trường đi',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 5,
          name: 'Hello mấy cưng',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 6,
          name: 'Nghỉ nha khỏi học hành gì hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        },
        {
          id: 7,
          name: 'Học quan gi, nghỉ chấm hết',
          description: 'Hoc khong bao nhieu dong tien thi nhieu...'
        }
      ]
    })
  }


  // Search
  updateSearch = (text) => {
    this.setState({
      searchLoading: true,
      search: text
    })

    setTimeout(()=> {
      this.setState({
        searchLoading: false
      })
    }, 2000)
  }


  // Selected button
  buttonSeleted = (index) => {
    if (index == 0) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }
  
  render() {
    const { search, searchLoading, categories, news } = this.state;
    return (
      <ThemeProvider>
        <Header title={ NAVIGATOR.home } />
        <SearchBar
          placeholder= { APP.searchInput }
          onChangeText={this.updateSearch}
          value={search}
          platform="android"
          showLoading = { searchLoading }
        />
        <Text>{ search }</Text>
        <View style={ { flexDirection: "column" } }>
          
          {/* CATEGORY HORIZONTAL TRUE */}
          <View style={ {  flexDirection: "row", marginTop: 0 } }>
            <ScrollView horizontal={ true } 
            style={ styles.ScrollView } >
              
              {
                categories.map((category, index)=> (
                  <Button style={ styles.Button }
                    buttonStyle={ this.buttonSeleted(index) }
                    title= { category.name }
                  ></Button>
                ))
              }
              
            </ScrollView>
          </View>

          {/* POSTS IN CATEGORY */}
          <View style={ { flexDirection: 'column' } }>
              <ScrollView horizontal={ false } >
              {
                news.map((newDetail, i)=> (
                  <ListItem key={i} bottomDivider>
                  <Avatar source= 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' />
                  <ListItem.Content>
                    <ListItem.Title>{newDetail.name}</ListItem.Title>
                    <ListItem.Subtitle>{newDetail.description}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                ))
              }
              </ScrollView>
          </View>

        </View>


      </ThemeProvider>
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
  ButtonStyle: {
    borderRadius: 50,
    backgroundColor: '#ccc'
  },
  ButtonStyleSelected: {
    borderRadius: 50,
    backgroundColor: '#606060'
  },
  ScrollView: {
    marginHorizontal: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
  }
});