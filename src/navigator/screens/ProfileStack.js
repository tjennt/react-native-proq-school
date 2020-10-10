// IMPORT COMPONENT
import ProfileScreen from '../../screens/ProfileScreen';

import { createStackNavigator } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';


const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            title: NAVIGATOR.newsInHome,
            headerTitleAlign: 'left',
            headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
            headerStyle: { height: 50, backgroundColor: COLORS.MAIN_PRIMARY }
        }
        },
        
    },
    {
        initialRouteName: 'ProfileScreen'
    }
);

export default ProfileStack;
  