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
  Avatar } from 'react-native-elements';

import STYLE_GOBAL from '../styles';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';

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

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../components/Helpers/EmptyData';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      axiosNews: [],
      news: [],
      numberMoreNews: 0,
      selectedCategory: 0,
      loadingNews: true
    }
  }

  componentDidMount() {    
      this.getListNewsAndCategories()
  }

  getListNewsAndCategories = async ()=> {
    await this.handleAxiosCategories()
    await this.handleAxiosNews()
  }
  // AXIOS GET CATEGORIES
  handleAxiosCategories = async ()=> {
    try {
      let res = await axios.get(`${PARAMETER.SERVER_API}${PARAMETER.API_NAME.categories}`)
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
      let res = await axios.get(`${PARAMETER.SERVER_API}${PARAMETER.API_NAME.news}`)
      let { data } = res 
      this.setState({
        news: data,
        loadingNews: false
      })
      // this.moreNews()
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

    // console.log('CLICK')
    setTimeout(()=> {
      this.setState({
        loadingNews: false
      })
    }, 1)
  }
  
  getNewsDetail = () => {
    this.props.navigation.push('NewsDetail')
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { categories, news, loadingNews } = this.state
    const { navigation } = this.props
    
    if (loadingNews) {

      return <EmptyData loading={ loadingNews } />

    } else {
     return (
          <View style={ styles.ViewRender }>
              
          {/* CATEGORY HORIZONTAL TRUE */}
          <View style={ styles.ViewCategories }>

            <ListCategoriesComponent 
              categories={ categories }
              getNews={ this.getNews }
              buttonStyleSeleted={ this.buttonStyleSeleted } 
              />
          </View>

          {/* POSTS IN CATEGORY */}
          <View style={ { flexDirection: 'column'} }>
              
            <ListNewsComponent
              navigation = { navigation }
              moreNews = { this.moreNews }
              news={ news } 
            />

          </View>

        </View>
     )
    }
  }
  render() {
    const { categories, news, loadingNews } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex:1, backgroundColor: COLORS.LIGHT }}>
        {
          this.viewNewsOrLoader()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    ButtonStyle: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      marginRight: 10,
      borderRadius: 50,
      backgroundColor: '#cccccc'
    },
    ButtonStyleSelected: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      marginRight: 10,
      borderRadius: 50,
      backgroundColor: COLORS.MAIN_TEXT
    },
    ViewRender: {
      flexDirection: "column", 
      marginTop: 10
    },
    ViewCategories: {  
      flexDirection: "row",
      paddingBottom: 10
    }
});