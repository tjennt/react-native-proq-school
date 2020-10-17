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

// IMPORT REDUX
import {Provider} from 'react-redux';
import store from './src/store';

export default class App extends React.Component {

  state = {
    navigator: null,
    selectedTabnavigator: null,
    loading: false,
    user: {}
  }
    
  // NAVIGATOR STUDENT
  NavigatorStudent = createMaterialBottomTabNavigator(
    TabNavigatorRender.STUDENT,
    {
      initialRouteName: 'Profile',
      activeColor: COLORS.LIGHT,
      inactiveColor: COLORS.LIGHT_HIGHT,
      barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
    }
  );

  // NAVIGATOR TEACHER
  NavigatorTeacher = createMaterialBottomTabNavigator(
    TabNavigatorRender.TEACHER,
    {
      initialRouteName: 'Home',
      activeColor: COLORS.LIGHT,
      inactiveColor: COLORS.LIGHT_HIGHT,
      barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
    }
  )
    
  // LOGIN
  login = (user) => {
    this.setState({
      user: user,
      loading: true
    })
    setTimeout(()=> {   
      this.setState({
        navigator: user.role,
        selectedTabnavigator: user.role
      })
    }, 1)
  }

  render () {
    const NavigatorStudent = createAppContainer(this.NavigatorStudent)
    const NavigatorTeacher = createAppContainer(this.NavigatorTeacher)

    let Navigator = NavigatorTeacher;
    if (this.state.selectedTabnavigator == 'student'){
      Navigator = NavigatorStudent
    }
    if (this.state.navigator ==  null) {
      return (
        <Provider store = {store}>
          <LoginComponent title="LOGIN"
            loading = {this.state.loading}
            loginFunction = { this.login }
          />
        </Provider>
      )
    }

    return (
      <Provider store = {store}>
        <Navigator />
      </Provider>
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