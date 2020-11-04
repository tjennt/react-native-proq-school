// IMPORT COMPONENT
import StudentScheduleScreen from '../../screens/students/StudentScheduleScreen';
import TeacherScheduleScreen from '../../screens/teachers/TeacherScheduleScreen';
import TeacherScheduleClassScreen from '../../screens/teachers/TeacherScheduleClassScreen';


import { createStackNavigator } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';

export const StudentScheduleStack = createStackNavigator(
    {
        StudentScheduleScreen: {
        screen: StudentScheduleScreen,
        navigationOptions: {
            title: NAVIGATOR.scheduleStudent,
            headerTitleAlign: 'left',
            headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
            headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
        }
        },
        
    },
    {
        initialRouteName: 'StudentScheduleScreen'
    }
);

export const TeacherScheduleStack = createStackNavigator(
    {
        TeacherScheduleScreen: {
        screen: TeacherScheduleScreen,
        navigationOptions: {
                title: NAVIGATOR.scheduleTeacher,
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        },
        TeacherScheduleClassScreen: {
            screen: TeacherScheduleClassScreen,
            navigationOptions: {
                title: NAVIGATOR.scheduleTeacher,
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        },
        
    },
    {
        initialRouteName: 'TeacherScheduleScreen'
    }
);