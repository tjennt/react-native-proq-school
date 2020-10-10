import React, { Component } from 'react';
import { 
    View, 
    Text
  } from 'react-native';

import STYLE_GOBAL from '../styles/Global';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'hello'
    }
  }
  
  componentDidMount() {

    console.log("{PROFILE");
    setTimeout(()=> {
      this.setState({
        title: "ProfileScreen"
      })
    }, 2000)
  }

  render() {
    return (
      <View style={STYLE_GOBAL.container}>
        <Text>{ this.state.title }</Text>
      </View>
    )
  }
}