import React from 'react';

// IMPORT REACT NATIVE
import { StyleSheet,Text, TextInput } from 'react-native';

// IMPORT COMPOMENT
import LoginComponent from './src/components/login/LoginComponent';

// IMPORT LIBRARY
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// IMPORT TAB NAVIGATOR
import * as TabNavigatorRender from './src/navigator/TabNavigator';

// IMPORT COLORS
import * as COLORS from './src/constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from './src/constants/Parameter';

// IMPORT REDUX
import {Provider} from 'react-redux';
import store from './src/store';

// IMPORT PUSH NOTIFICATION
import { registerForPushNotificationsAsync } from './src/services/Notification';
import * as Notifications from 'expo-notifications'

// IMPORT EXPO FONT
import * as Font from 'expo-font';

// GLOBAL PROPS
import {
  setCustomTextInput,
  setCustomText
} from 'react-native-global-props';

export default class App extends React.Component {

  state = {
    navigator: null,
    selectedTabnavigator: null,
    loading: false,
    user: {},
    tokenNotification: ''
  }
  
  async componentDidMount() {

    await Font.loadAsync({
      'quick-sand': require('./src/assets/fonts/Quicksand.ttf'),
      'quick-sand-bold': require('./src/assets/fonts/Quicksand-Bold.ttf')
    });
    
    // await this.defaultFonts()
    // let token = await registerForPushNotificationsAsync()
    // // console.log(token)
    // this.setState({tokenNotification: token})
    // Notifications.addNotificationReceivedListener(this.handleNotifications)
  }

  // defaultFonts = async ()=> {
  //   const customTextProps = {
  //     style: {
  //       fontFamily: PARAMETER.FONT_MAIN
  //     }
  //   }
  //   await setCustomText(customTextProps)
  //   console.log('SET FONT DEFAULT SUCCESS')
  // }

  handleNotifications = (notification)=> {
    console.log(notification)
  }

  // LOGIN
  login = (user) => {
    
    // this.setState({
    //   user: user,
    //   loading: true
    // })
    console.log(user)
    this.setState({
      navigator: user.role,
      selectedTabnavigator: user.role
    })
  }

  // Navigator
  Navigator() {
    const NavigatorStudent = createAppContainer(createMaterialBottomTabNavigator(
      TabNavigatorRender.STUDENT,
      {
        initialRouteName: 'Home',
        activeColor: COLORS.LIGHT,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        defaultNavigationOptions: {
          headerTitleStyle: { 
              fontFamily: PARAMETER.FONT_BOLD_MAIN,
              color: COLORS.LIGHT 
          },
        }
      }
    ))

    // return <NavigatorStudent />

    const NavigatorTeacher = createAppContainer(createMaterialBottomTabNavigator(
      TabNavigatorRender.TEACHER,
      {
        initialRouteName: 'Home',
        activeColor: COLORS.LIGHT,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
      }
    ))

    // return <NavigatorTeacher />

    if (this.state.selectedTabnavigator == PARAMETER.STUDENT_ROLE){
      // console.log(this.state.selectedTabnavigator, PARAMETER.STUDENT_ROLE)
      return <NavigatorStudent />
    }

    return <NavigatorTeacher />

  }

  render () {

    // Code view
    // return (
    //   <Provider store = {store}>
    //     { this.Navigator() }
    //   </Provider>
    // )

    if (this.state.navigator ==  null) {
      return (
        <Provider store = {store}>
          <LoginComponent
            loading = {this.state.loading}
            loginFunction = { this.login }
          />
          <TextInput value={ this.state.tokenNotification } />
        </Provider>
      )
    }

    return (
      <Provider store = {store}>
        { this.Navigator() }
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  ProviderApp: {
    
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});