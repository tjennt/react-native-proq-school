import React from 'react';

// IMPORT COMPONENT
import HomeScreen from '../../screens/HomeScreen';
import NewsDetail from '../../screens/home/NewDetailScreen';

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

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: NAVIGATOR.newsInHome,
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: COLORS.LIGHT }
      }
    },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: {
        title: '',
        headerTintColor: COLORS.LIGHT
      },
    },
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
        headerTitleStyle: { 
          fontFamily: PARAMETER.FONT_BOLD_MAIN,
          color: COLORS.MAIN_PRIMARY
        },
        headerBackImage: ()=> (
            <Entypo 
              style={
                [
                  {
                    color: COLORS.LIGHT,
                    backgroundColor: COLORS.MAIN_TEXT,
                    padding: 3,
                    borderRadius: 50,
                    fontSize: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 7
                  }
                ]
              } 
              name="chevron-thin-left" 
              size={25} />
        ),
        ...TransitionPresets.SlideFromRightIOS,
    },
}
);

export default HomeStack;
  