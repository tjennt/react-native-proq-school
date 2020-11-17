// IMPORT COMPONENT
import MoreScreen from '../../screens/MoreScreen';

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';


const MoreStack = createStackNavigator(
  {
    MoreScreen: {
      screen: MoreScreen
    },
  },
  {
    initialRouteName: 'MoreScreen',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

export default MoreStack;
  