import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    SafeAreaView, 
    FlatList,
    ActivityIndicator 
     } from 'react-native';

    
import {
    ListItem, 
    Avatar,
    Button } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { APP } from '../../constants/Locale';

import * as PARAMETER from '../../constants/Parameter';
import * as COLORS from '../../constants/Colors';

import GLOBAL_STYLES from '../../styles';

// IMPORT RENDER HTML
import HTML from "react-native-render-html";

export default class ListNewsComponent extends Component {


  getImageAvatar = ()=> {
    const { notifyType } = this.props
    console.log("notifyType", notifyType);
    if(notifyType == 'fee'){
      return require('../../assets/images/illustrators/notify/fee.png')
    }
    if(notifyType == 'activity') {
      return require('../../assets/images/illustrators/notify/activity.png')
    }

    return require('../../assets/images/illustrators/notify/learning.png')
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => {
    const { navigation } = this.props

    return (
      <ListItem
        key={item.id}
        style={ styles.ListItemNews }
        // bottomDivider
        onPress={ ()=> { 
          navigation.push('NewsDetail', {
            news: item,
            image: this.getImageAvatar()
          }) 
        } }
      >
        <Avatar 
          avatarStyle={{ borderRadius: 10 }}
          size="large"
          source= { this.getImageAvatar() }
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem.Content>
        <ListItem.Title style={[GLOBAL_STYLES.TextTitleStyle]}>{item.title} { item.id }</ListItem.Title>
          <ListItem.Subtitle 
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[GLOBAL_STYLES.TextStyle, {width: 150}]}
          >
            <HTML html={`<div style="color: #9d9c9e;">${item.description}</div>`} />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )

  }

  render () {
    const { navigation, news, loading } = this.props;
    // console.log(news)
    return (
        <SafeAreaView
          style={ styles.SafeAreaView }
          >
            <FlatList
            refreshing={loading}
            // onRefresh={()=> alert('onRefresh')}
            keyExtractor={this.keyExtractor}
            data={news}
            renderItem={this.renderItem}
        />
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  ViewButon: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonMore: {

  },
  SafeAreaView: { 
    flex: 1
  },
  ListItemNews: {
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})