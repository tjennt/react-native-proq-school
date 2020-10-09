import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView
     } from 'react-native';

    
import {
    ListItem, 
    Avatar } from 'react-native-elements';

export default class ListNewsComponent extends Component {
    render () {
        const { navigation, news } = this.props;
        return (
            <ScrollView horizontal={ false } >
              {
                news.map((newDetail, i)=> (
                  <ListItem key={i} bottomDivider>
                  <Avatar 
                    avatarStyle={{ borderRadius: 10 }}
                    size="large"
                    source= 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg' 
                />
                  <ListItem.Content>
                    <ListItem.Title>{newDetail.name}</ListItem.Title>
                    <ListItem.Subtitle 
                      onPress={ ()=> { navigation.navigate('NewsDetail') } }
                    >{newDetail.description}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                ))
              }
            </ScrollView>
        )
    }
}