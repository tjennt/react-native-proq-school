import React, { Component } from 'react';
import { 
    View, 
    Text
  } from 'react-native';

import STYLE_GOBAL from '../styles/Global';

export default class MoreScreen extends React.Component {
    render() {
      return (
        <View style={STYLE_GOBAL.container}>
          <Text>More Screen</Text>
        </View>
      )
    }
  }