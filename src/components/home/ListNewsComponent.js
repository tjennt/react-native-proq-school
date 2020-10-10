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
        let heightScroll = 'unset';

        if (PARAMETER.HEIGHT_SCROLL != 0) {
          heightScroll = PARAMETER.HEIGHT_SCROLL;
        }

        return (
            <ScrollView 
              horizontal={ false }
              style={ { height: heightScroll } }
              >
              {
                news.map((newDetail, i)=> (
                  <ListItem 
                    key={i} 
                    bottomDivider
                    onPress={ ()=> { 
                      navigation.navigate('NewsDetail', {
                        news: newDetail  
                      }) 
                    } }
                  >
                  <Avatar 
                    avatarStyle={{ borderRadius: 10 }}
                    size="large"
                    source= { newDetail.image }
                    PlaceholderContent={<ActivityIndicator />}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{newDetail.title}</ListItem.Title>
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

  }
})