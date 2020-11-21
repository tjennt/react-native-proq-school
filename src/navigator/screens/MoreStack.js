// IMPORT COMPONENT
import MoreScreen from '../../screens/MoreScreen';

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

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
  },
  {
    initialRouteName: 'MoreScreen',
    defaultNavigationOptions: {
      headerTitleStyle: { 
        fontFamily: PARAMETER.FONT_BOLD_MAIN,
        color: COLORS.LIGHT 
      },
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

export default MoreStack;
  