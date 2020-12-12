import React, { Component } from 'react';
import { View, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator } from 'react-native';

import { Button, 
  Header,
  Text, 
  ThemeProvider, 
  ListItem, 
  Avatar, 
  SearchBar,
  Image } from 'react-native-elements';

import STYLE_GOBAL from '../../styles';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

import * as COLORS from '../../constants/Colors';
import Constants from 'expo-constants';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT RENDER HTML
import HTML from "react-native-render-html";

import GLOBAL_STYLES from '../../styles';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

export default class NewDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true
  });

  constructor(props) {
    super(props)
    this.state = {
      opacityImage: 0.8
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
  }

  handleScroll = (event)=> {
    const { navigation } = this.props
    let height = event.nativeEvent.contentOffset.y
    let heightResult = 0.8


    if (height >= 10 && height < 40) {
      heightResult = 0.7
    }
    else if (height >= 40 && height < 60){
      heightResult = 0.6
    }
    else if (height >= 60 && height < 80){
      heightResult = 0.5
    }
    else if (height >= 80 && height < 100){
      heightResult = 0.3
    }
    else if (height >= 100 && height < 120){
      heightResult = 0.3
    }
    else if (height >= 120 && height < 140){
      heightResult = 0.2
    }
    else if (height >= 140 && height < 160){
      heightResult = 0.1
    }
    else if (height >= 160){
      heightResult = 0
    }
    
    // if(heightResult <= 0.2) { 
    //   navigation.setParams({'barStatus': false})
    // }else {
    //   navigation.setParams({'barStatus': true})
    // }

    this.setState({opacityImage: heightResult})
  }
  
  render() {
    const { navigation } = this.props
    const news = navigation.getParam('news')
    const image = navigation.getParam('image')
    const { opacityImage } = this.state
    return (
      <View style={ styles.container }>
        <View style={ styles.viewImage }>
          <Image
            source={ image }
            style={ [styles.image, { opacity: opacityImage } ] }
            PlaceholderContent={<ActivityIndicator color={ COLORS.MAIN_PRIMARY } />}
          />
        </View>

        <ScrollView
          style={ styles.scrollView }
          onScroll={this.handleScroll}
        >
          <View style={ styles.viewContent }>
          <Text style={ [styles.title] }>
            {/* { news.title } */}
            { news.title }
            </Text>
              {/* AUTHOR, TIME */}
              <View style={ { flexDirection: 'row', marginTop: 10 } }>
                <Text style={ [GLOBAL_STYLES.TextStyle, styles.author] }>{ APP.place }: { news.place }</Text>
                <Text 
                  style={ [GLOBAL_STYLES.TextStyle, styles.time] }>{ APP.time }: { HelperService.getDateFormat(news.createdAt) }</Text>
              </View>
              <Text style={ [GLOBAL_STYLES.TextStyle, styles.author] }>{ APP.view }: {news.viewers.length}</Text>

              {/* CONTENT */}
              <View style={ styles.viewText }>
                <Text style={[ GLOBAL_STYLES.TextStyle, { fontSize: 20 }] }></Text>
                <HTML 
                  // tagsStyles={styles.HTML}
                  html={news.description} 
                  contentWidth={100}
                />
              </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT
  },
  viewContent: {
    padding: 10,
    marginTop: 190,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5
  },
  scrollView: {
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  author: { 
    flex: 0.5, 
    color: COLORS.MAIN_GRAY
  },
  time: { 
    flex: 0.5, 
    color: COLORS.MAIN_GRAY, 
    textAlign: 'right', 
    alignSelf: 'stretch' 
  },
  viewText: {
    marginTop: 10
  },
  viewImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    backgroundColor: "#000000"
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  HTML: {

  }
});