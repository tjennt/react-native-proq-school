import React from 'react';

// IMPORT REACT NATIVE
import { StyleSheet } from 'react-native';

// IMPORT REACT NATIVE ELEMENT
import { Button,
  Text,
  ThemeProvider
 } from 'react-native-elements';

// IMPORT COMPOMENT
import Header from './src/components/headers/DefaultHeaderComponent';
import LoginComponent from './src/components/login/LoginComponent';

// IMPORT SCREEN
// import LoginScreen from './src/sreens/LoginScreen';
// import HomeScreen from './src/sreens/HomeScreen';
// import ProfileScreen from './src/sreens/ProfileScreen';
// import SettingScreen from './src/sreens/SettingScreen';

// IMPORT LIBRARY
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';

import * as TabNavigatorRender from './src/services/TabNavigator';

export default class App extends React.Component {

  state = {
    navigator: 'student',
    selectedTabnavigator: 'student',
    loading: false
  }
  // SELECTED TAB NAVIGATOR
  selectedTabNavigator = () => {
    if (this.state.selectedTabnavigator == 'student') {
      return TabNavigatorRender.STUDENT
    }
    return TabNavigatorRender.TEACHER
  }

  // CREATE TAB NAVIGATOR BOTTOM
  TabNavigator = createMaterialBottomTabNavigator(
    this.selectedTabNavigator(),
    {
      initialRouteName: 'Home',
      activeColor: '#ffffff',
      inactiveColor: '#bda1f7',
      barStyle: { backgroundColor: '#6948f4' },
    }
  );

  login = () => {
    this.setState({
      loading: true
    })
    setTimeout(()=> {   
      this.setState({
        navigator: 'teacher'
      })
    }, 2000)
  }

  render () {
    const Navigator = createAppContainer(this.TabNavigator);

    if (this.state.navigator == 'student') {
      return (
        <LoginComponent title="LOGIN"
          loading = {this.state.loading}
          loginFunction = { this.login }
        />
      )
    }
    return (
      <Navigator></Navigator>
    )

  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});