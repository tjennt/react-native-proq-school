import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView,
    ActivityIndicator 
     } from 'react-native';

    
import {
    ListItem, 
    Avatar,
    Button } from 'react-native-elements';
import { APP } from '../../constants/Locale';

import * as PARAMETER from '../../constants/Parameter';

export default class ListNewsComponent extends Component {
    render () {
        const { navigation, news, moreNews } = this.props;

        return (
            <ScrollView 
              horizontal={ false }
              style={ styles.ScrollView }
              >
              {
                news.map((newDetail, index)=> (
                  <ListItem 
                    key={ newDetail.id }
                    style={ styles.ListItemNews }
                    // bottomDivider
                    onPress={ ()=> { 
                      navigation.push('NewsDetail', {
                        news: newDetail 
                      }) 
                    } }
                  >
                  <Avatar 
                    avatarStyle={{ borderRadius: 10 }}
                    size="large"
                    source= { { uri: newDetail.image } }
                    PlaceholderContent={<ActivityIndicator />}
                  />
                  <ListItem.Content>
                  <ListItem.Title>{newDetail.title} { newDetail.id }</ListItem.Title>
                    <ListItem.Subtitle >{newDetail.shortDescription}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                ))
              }
              <View style={ styles.ViewButon }>
                <Button 
                  title={ APP.more }
                  type="clear"
                  buttonStyle={ styles.ButtonMore }
                  onPress={ ()=>{ moreNews() } }
                ></Button>
              </View>
            </ScrollView>
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
  ScrollView: { 
    // paddingLeft: 5, 
    // paddingRight: 5, 
    height: PARAMETER.HEIGHT_SCROLL != 0 ? PARAMETER.HEIGHT_SCROLL - 10 : '0'
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