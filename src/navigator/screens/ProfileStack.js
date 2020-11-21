// IMPORT COMPONENT
import ProfileScreen from '../../screens/ProfileScreen';

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';


const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                title: '',
                headerTransparent: true
            } 
        },
    },
    {
        initialRouteName: 'ProfileScreen',
        defaultNavigationOptions: {
            headerTitleStyle: { 
                fontFamily: PARAMETER.FONT_BOLD_MAIN,
                color: COLORS.LIGHT 
            },
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export default ProfileStack;
  