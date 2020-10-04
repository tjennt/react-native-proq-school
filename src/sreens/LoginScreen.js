import React, { Component } from 'react';

import { Button, Text, ThemeProvider, Avatar, Badge } from 'react-native-elements';
import STYLE_GOBAL from '../styles';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';

export default class HomeScreen extends React.Component {
    
  render() {
    return (
      <ThemeProvider style={STYLE_GOBAL.container}>
        <Header title="LOGIN" />
        <Text> { this.props.title } </Text>
      </ThemeProvider>
    )
  }
}