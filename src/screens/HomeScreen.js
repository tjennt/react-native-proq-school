import React, { Component } from 'react';
import { View, 
  StyleSheet, 
  ToastAndroid, 
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

// IMPORT SOCKET IO CLIENT
import io from "socket.io-client";

// IMPORT AXIOS
import axios from 'axios';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../components/Helpers/EmptyData';

// IMPORT SERVICE AXIOS
import * as notifyService from '../services/api/notify/notifyService';


// IMPORT REDUX
import * as actions from '../actions';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      loadingCategories: true,
      axiosNews: [],
      news: [],
      numberMoreNews: 0,
      selectedCategory: 0,
      loadingNews: true,
      notifyType: 'fee'
    }
  }

  componentDidMount() {
      this.getListNewsAndCategories()

    this.chat = io(PARAMETER.SERVER);
    
    this.chat.on("SEND_MESSAGE_CHAT", data => {
        const { user } = this.props
        if (
          data.group.members.includes(user._id) &&
          data.from != user._id
        ) {
          ToastAndroid.showWithGravityAndOffset(
            "Bạn có tin nhắn mới!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          )
        }
    })

    this.chat.on("ON_NOTIFY", data => {
      const { user } = this.props
      ToastAndroid.showWithGravityAndOffset(
        `Thông báo: ${data.title}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      )
    })
  }

  getListNewsAndCategories = async ()=> {
    await this.handleAxiosCategories()
    this.handleAxiosNews()
  }
  // AXIOS GET CATEGORIES
  handleAxiosCategories = async ()=> {
    const { user } = this.props
    try {
      let data = await notifyService.getTypeNotify({user})
      this.setState(data)
    } catch (error) {
      console.log(error)
    }
  }

  // AXIOS GET NEWS
  handleAxiosNews = async (url_type = 'fee')=> {
    const { user } = this.props
    try {
      let data = await notifyService.getNotifyByType({
        user: user,
        url_type: url_type
      })
      this.setState(data)
    } catch (error) {
      console.log(error)
    }
  }

  // scroll more news
  // moreNews = ()=> {
  //   const { news, axiosNews, numberMoreNews } = this.state;
  //   let newsArray = axiosNews.slice(numberMoreNews, numberMoreNews + 10).map((newDetail)=>{
  //     return newDetail;
  //   });

  //   this.setState({
  //     news: news.concat(newsArray),
  //     numberMoreNews: numberMoreNews + 10
  //   })
  //   return true
  // }


  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedCategory) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  getNews = async (notifyType, index)=> {
    if (index == this.state.selectedCategory) { return }
    
    await this.setState({
      selectedCategory: index,
      notifyType: notifyType,
      loadingNews: true
    })
    
    this.handleAxiosNews(notifyType)
  }
  
  getNewsDetail = () => {
    this.props.navigation.navigate('NewsDetail')
  }

  viewNotifyTypeOrEmpty = ()=> {
    const { categories, loadingCategories } = this.state
    if (loadingCategories) {
      return <EmptyData loading={ loadingCategories } />
    }

    return <ListCategoriesComponent 
              categories={ categories }
              getNews={ this.getNews }
              buttonStyleSeleted={ this.buttonStyleSeleted } 
              />
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { news, loadingNews, notifyType } = this.state
    const { navigation } = this.props

    if (loadingNews) {

      return <EmptyData loading={ loadingNews } />

    } else {
      
      if(news.length == 0) {
        return <EmptyData loading={false} />
      }

      return (        
        <ListNewsComponent
          loading={loadingNews}
          navigation = {navigation}
          notifyType={notifyType}
          news={ news } 
          handleAxiosNews={this.handleAxiosNews}
        />
      )
    }
  }
  render() {
    return (
      <View style={{ flex:1, backgroundColor: COLORS.LIGHT }}>
          {/* CATEGORY HORIZONTAL TRUE */}
          <View style={ styles.ViewCategories }>
            {
              this.viewNotifyTypeOrEmpty()
            }
          </View>

          {/* POSTS IN CATEGORY */}
          {
            this.viewNewsOrLoader()
          }
            
      </View>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(HomeScreen);

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
      paddingTop: 10
    }
});