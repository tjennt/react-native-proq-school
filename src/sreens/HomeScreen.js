import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, ThemeProvider, Avatar, SearchBar } from 'react-native-elements';
import STYLE_GOBAL from '../styles';

// IMPORT 
import { TabView, SceneMap } from 'react-native-tab-view';

// IMPORT HEADER
import Header from '../components/headers/DefaultHeaderComponent';
import TestComponent from '../components/TestComponent';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../constants/Locale';


const initialLayout = { width: Dimensions.get('window').width };

const layoutRender = () => (
  <TestComponent title="CHILDREN" />
)
export default class HomeScreen extends React.Component {
  
  state = {
    search: '',
    index: 0,
    routes: [],
    renderScene: {
      music: layoutRender,
      albums: layoutRender,
      recents: layoutRender,
      purchased: layoutRender
    }
  };


  componentDidMount () {
    this.setState({
      routes: [
        { key: 'music', title: 'Music' },
        { key: 'albums', title: 'Albums' },
        { key: 'recents', title: 'Recents' },
        { key: 'purchased', title: 'Purchased' },
      ]
    })
  }
  
  updateSearch = (search) => {
    this.setState({ search });
  };
  
  renderScene = SceneMap(this.state.renderScene);

  setIndex = index => this.setState({ index });

  render() {
    const { search, index, routes } = this.state;
    return (
      <ThemeProvider>
        <Header title={ NAVIGATOR.home } />
        <SearchBar
          placeholder= { APP.searchInput }
          onChangeText={this.updateSearch}
          value={search}
          platform="android"
          showLoading = { true }
        />
        <Text>{ search }</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={this.renderScene}
          onIndexChange={this.setIndex}
          initialLayout={initialLayout}
          contentContainerStyle = {{ backgroundColor: 'red', color: 'red' }}
        />

      </ThemeProvider>
    )
  }
}