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

// IMPORT PARAMETER
import * as PARAMETER from '../constants/Parameter';

import * as COLORS from '../constants/Colors';
import Constants from 'expo-constants';

// IMPORT COMPONENT HOME SCREEN
import ListNewsComponent from '../components/home/ListNewsComponent';
import ListCategoriesComponent from '../components/home/ListCategoriesComponent';

// IMPORT LOADER
import LoaderListNewsComponent from '../components/loader/LoaderListNewsComponent';

// IMPORT AXIOS
import axios from 'axios';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchLoading: false,
      categories: [],
      axiosNews: [],
      news: [],
      numberMoreNews: 0,
      selectedCategory: 0,
      loadingNews: true
    }
  }

  async componentDidMount() {
    try {
      let categories  = await this.handleAxiosCategories()
      let news        = await this.handleAxiosNews()
      let loadScreent = await this.handleLoadScreen()
      if (categories && news && loadScreent) {
        this.setState({
          loadingNews: false
        })
      }

    } catch (error) {
      
    }
  }

  // LOAD SCREEN
  handleLoadScreen = async ()=> {
    const { navigation } = this.props;
    await navigation.navigate('StudentScheduleScreen')
    await navigation.navigate('ProfileScreen')
    await navigation.navigate('StudentSubjectScreen')
    await navigation.navigate('More')
    await navigation.navigate('HomeScreen')
    // await navigation.navigate('HLEL')
    
    return true
  }

  // AXIOS GET CATEGORIES
  handleAxiosCategories = async ()=> {
    try {
      let res = await axios.get(`${PARAMETER.SERVER_API}/api/categories`)
      let { data } = res 
      this.setState({
        categories: data
      })
    } catch (error) {
      console.log(error)
    }
    return true
  }

  // AXIOS GET NEWS

  handleAxiosNews = async ()=> {
    try {
      let res = await axios.get(`${PARAMETER.SERVER_API}/api/news`)
      let { data } = res 
      this.setState({
        axiosNews: data
      })
      this.moreNews()
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
    return true
  }

  // scroll more news
  moreNews = ()=> {
    const { news, axiosNews, numberMoreNews } = this.state;
    let newsArray = axiosNews.slice(numberMoreNews, numberMoreNews + 10).map((newDetail)=>{
      return newDetail;
    });

    this.setState({
      news: news.concat(newsArray),
      numberMoreNews: numberMoreNews + 10
    })
    return true
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
                          moreNews = { this.moreNews }
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