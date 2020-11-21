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
import { APP } from '../../constants/Locale';

import * as PARAMETER from '../../constants/Parameter';

import GLOBAL_STYLES from '../../styles';

export default class ListNewsComponent extends Component {

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
            news: item 
          }) 
        } }
      >
        <Avatar 
          avatarStyle={{ borderRadius: 10 }}
          size="large"
          source= { { uri: item.image } }
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem.Content>
        <ListItem.Title style={[GLOBAL_STYLES.TextTitleStyle]}>{item.title} { item.id }</ListItem.Title>
          <ListItem.Subtitle style={[GLOBAL_STYLES.TextStyle]}>{item.shortDescription}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )

  }

  render () {
    const { navigation, news, moreNews } = this.props;
    // console.log(news)
    return (
        <SafeAreaView 
          horizontal={ false }
          style={ styles.ScrollView }
          >
            <FlatList
            keyExtractor={this.keyExtractor}
            data={news}
            renderItem={this.renderItem}
        />
        </SafeAreaView>
    )
  }
}

{/* <View style={ styles.ViewButon }>
<Button 
  title={ APP.more }
  type="clear"
  buttonStyle={ styles.ButtonMore }
  onPress={ ()=>{ moreNews() } }
></Button>
</View> */}

const styles = StyleSheet.create({
  ViewButon: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonMore: {

  },
  ScrollView: { 
  
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