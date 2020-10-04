import React, { Component } from 'react';

import { Button, Text, ThemeProvider, Avatar, Badge } from 'react-native-elements';
import STYLE_GOBAL from '../styles';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';

export default class HomeScreen extends React.Component {
    
  render() {
    return (
      <ThemeProvider style={STYLE_GOBAL.container}>
        <Header title="HOME" />
        <Avatar
          rounded
          source={{
            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
          }}
          size="large"
        />
      </ThemeProvider>
    )
  }
}