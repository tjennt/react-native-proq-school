import React from 'react';
// IMPORT COMPONENT
import MoreScreen from '../../screens/MoreScreen';
import UserScreen from '../../screens/chat/UserScreen';
import ChatScreen from '../../screens/chat/ChatScreen';

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

// IMPORT LIBRARY
import {
  Entypo
} from 'react-native-vector-icons';

const MoreStack = createStackNavigator(
  {
    MoreScreen: {
      screen: MoreScreen,
      navigationOptions: {
        //  headerTransparent: true
        title: 'MENU',
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
      }
    },
    UserScreen: {
      screen: UserScreen
    },
    ChatScreen: {
      screen: ChatScreen
    }
  },
  {
    initialRouteName: 'MoreScreen',
    defaultNavigationOptions: {
      headerTitleStyle: { 
        fontFamily: PARAMETER.FONT_BOLD_MAIN,
        color: COLORS.LIGHT 
      },
      headerBackImage: ()=> (
        <Entypo style={[{color: COLORS.LIGHT}]} name="chevron-thin-left" size={25} />
      ),
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

export default MoreStack;
  