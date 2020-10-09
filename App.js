import React from 'react';

// IMPORT REACT NATIVE
import { StyleSheet } from 'react-native';

// IMPORT COMPOMENT
import LoginComponent from './src/components/login/LoginComponent';


// IMPORT LIBRARY
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// IMPORT TAB NAVIGATOR
import * as TabNavigatorRender from './src/navigator/TabNavigator';

// IMPORT COLORS
import * as COLORS from './src/constants/Colors';


export default class App extends React.Component {

  state = {
    navigator: 'student',
    selectedTabnavigator: 'student',
    loading: false
  }

  // SELECTED TAB NAVIGATOR
  selectedTabNavigator = () => {
    // if (this.state.selectedTabnavigator == 'student') {
    //   return TabNavigatorRender.STUDENT
    // }
    return TabNavigatorRender.STUDENT
  }

  // CREATE TAB NAVIGATOR BOTTOM
  TabNavigator = createMaterialBottomTabNavigator(
    this.selectedTabNavigator(),
    {
      initialRouteName: 'Home',
      activeColor: COLORS.LIGHT,
      inactiveColor: COLORS.LIGHT_HIGHT,
      barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
    }
  );

  // Login
  login = () => {
    this.setState({
      loading: true
    })
    setTimeout(()=> {   
      this.setState({
        navigator: 'teacher'
      })
    }, 1000)
  }

  render () {
    const Navigator = createAppContainer(this.TabNavigator);

    if (this.state.navigator == 'studentt') {
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