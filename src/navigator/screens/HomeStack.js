// IMPORT COMPONENT
import HomeScreen from '../../screens/HomeScreen';
import NewsDetail from '../../screens/home/NewDetailScreen';

import { createStackNavigator } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';


const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: NAVIGATOR.newsInHome,
        headerTitleAlign: 'left',
        headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
        headerStyle: { height: 50, backgroundColor: COLORS.MAIN_PRIMARY }
      }
    },
    NewsDetail: {
      screen: NewsDetail,
    },
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

export default HomeStack;
  