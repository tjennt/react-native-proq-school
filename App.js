import React from 'react';

// IMPORT REACT NATIVE
import { StyleSheet,Text, TextInput, Button } from 'react-native';

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
import * as Notifications from 'expo-notifications';

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
    
    let token = await registerForPushNotificationsAsync()
    this.setState({tokenNotification: token})
    Notifications.addNotificationReceivedListener(this.handleNotifications)
  }

  handleNotifications = (notification)=> {
    // console.log(notification)
    // alert(JSON.stringify(notification))
    
  }


  // LOGIN
  login = (user) => {
    
    // this.setState({
    //   user: user,
    //   loading: true
    // })
    // console.log(user)
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
        activeColor: COLORS.MAIN_PRIMARY,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.LIGHT },
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
        activeColor: COLORS.MAIN_PRIMARY,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.LIGHT },
      }
    ))

    // return <NavigatorTeacher />

    if (this.state.selectedTabnavigator == PARAMETER.STUDENT_ROLE){
      return <NavigatorStudent />
    }

    return <NavigatorTeacher />

  }

  render () {
    if (this.state.navigator ==  null) {
      return (
        <Provider store = {store}>
          <LoginComponent
            loading = {this.state.loading}
            tokenNotification={this.state.tokenNotification}
            loginFunction = { this.login }
          />
          {/* <Button
            title="SEND NOTI"
            onPress={()=>{this.sendPushNotification(this.state.tokenNotification)}}
          >
          </Button>
          <TextInput value={ this.state.tokenNotification } /> */}
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