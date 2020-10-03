import React, { Component } from 'react';

import { Button, Text, ThemeProvider, Avatar, Badge, Header } from 'react-native-elements';
import STYLE_GOBAL from '../styles/Global';

export default class HomeScreen extends React.Component {
    
    render() {
      return (
        <ThemeProvider style={STYLE_GOBAL.container}>
          <Header
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff', fontWeight: 'bold' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            backgroundColor="#2a4054"
          />
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