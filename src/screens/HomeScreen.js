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

import STYLE_GOBAL from '../styles';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';
import TestComponent from '../components/TestComponent';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../constants/Locale';

import * as COLORS from '../constants/Colors';
import Constants from 'expo-constants';

// IMPORT COMPONENT HOME SCREEN
import ListNewsComponent from '../components/home/ListNewsComponent';
import ListCategoriesComponent from '../components/home/ListCategoriesComponent';

// IMPORT LOADER
import LoaderListNewsComponent from '../components/loader/LoaderListNewsComponent';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchLoading: false,
      categories: [],
      news: [],
      selectedCategory: 0,
      loadingNews: true
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
          id: 2,
          name: 'Sự kiện'
        },
        {
          id: 3,
          name: 'Học phí'
        },
        {
          id: 4,
          name: 'Thú vui'
        },
        {
          id: 5,
          name: 'Đi chơi'
        }
      ],
      news: [
        {
          id: 1,
          name: 'Thông báo đóng học phí, hông báo đóng học phí',
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
        }
      ]
    })

    setTimeout(()=> {
      this.setState({
        loadingNews: false
      })
    }, 1)
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
    }, 1)
  }


  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedCategory) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  getNews = (categoryId, index)=> {
    if (index == this.state.selectedCategory) { return }
    this.setState({
      selectedCategory: index,
      loadingNews: true
    })

    console.log('CLICK')
    setTimeout(()=> {
      this.setState({
        loadingNews: false
      })
    }, 1)
  }
  getNewsDetail = () => {
    this.props.navigation.navigate.push('NewsDetail')
  }
  render() {
    const { search, searchLoading, categories, news, loadingNews } = this.state;
    const { navigation } = this.props;
    let viewNewsOrLoader;
    if (loadingNews) {
      viewNewsOrLoader = <LoaderListNewsComponent loading={ loadingNews } />
    } else {
      
      viewNewsOrLoader = <ListNewsComponent 
                          navigation = { navigation }
                          news={ news } />
    }

    return (
      <View style={{ backgroundColor: COLORS.LIGHT }}>
        {/* <Header title={ NAVIGATOR.home } /> */}
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
            {/* LIST CATEGORIES */}
            <ListCategoriesComponent 
              categories={ categories }
              getNews={ this.getNews }
              buttonStyleSeleted={ this.buttonStyleSeleted } 
              />
          </View>

          {/* POSTS IN CATEGORY */}
          <View style={ { flexDirection: 'column', marginTop: 15 } }>
              
              { viewNewsOrLoader }
          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    ButtonStyle: {
      borderRadius: 50,
      backgroundColor: '#cccccc'
    },
    ButtonStyleSelected: {
      borderRadius: 50,
      backgroundColor: '#606060'
    }
});