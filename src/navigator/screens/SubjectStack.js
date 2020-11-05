// IMPORT COMPONENT
import StudentSubjectScreen from '../../screens/students/StudentSubjectScreen';
import StudentScheduleSubjectScreen from '../../screens/students/StudentScheduleSubjectScreen';

import TeacherSubjectScreen from '../../screens/teachers/TeacherSubjectScreen';
import TeacherSubjectScheduleScreen from '../../screens/teachers/TeacherSubjectScheduleScreen';
import TeacherScheduleClassScreen from '../../screens/teachers/TeacherScheduleClassScreen';

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
            title: NAVIGATOR.subject.toUpperCase(),
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
            title: NAVIGATOR.subjectTeacher.toUpperCase(),
            headerTitleAlign: 'left',
            headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
            headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
        }
        },
        TeacherSubjectScheduleScreen: {
            screen: TeacherSubjectScheduleScreen
        },
        TeacherSubjectScheduleClassScreen: {
            screen: TeacherScheduleClassScreen,
            navigationOptions: {
                title: NAVIGATOR.attendance.toUpperCase(),
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        }
    },
    {
        initialRouteName: 'TeacherSubjectScreen'
    }
);
