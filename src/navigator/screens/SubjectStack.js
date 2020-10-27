// IMPORT COMPONENT
import StudentSubjectScreen from '../../screens/students/StudentSubjectScreen';
import StudentScheduleSubjectScreen from '../../screens/students/StudentScheduleSubjectScreen';

import TeacherSubjectScreen from '../../screens/teachers/TeacherSubjectScreen';

import { createStackNavigator } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';


export const StudentSubjectStack = createStackNavigator(
    {
        StudentSubjectScreen: {
        screen: StudentSubjectScreen,
            navigationOptions: {
            title: NAVIGATOR.subject,
            headerTitleAlign: 'left',
            headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
            headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        },
        StudentScheduleSubjectScreen: {
            screen: StudentScheduleSubjectScreen
        }
    },
    {
        initialRouteName: 'StudentSubjectScreen'
    }
);

export const TeacherSubjectStack = createStackNavigator(
    {
        TeacherSubjectScreen: {
        screen: TeacherSubjectScreen,
        navigationOptions: {
            title: NAVIGATOR.subject,
            headerTitleAlign: 'left',
            headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
            headerStyle: { height: 50, backgroundColor: COLORS.MAIN_PRIMARY }
        }
        },
        
    },
    {
        initialRouteName: 'TeacherSubjectScreen'
    }
);

  