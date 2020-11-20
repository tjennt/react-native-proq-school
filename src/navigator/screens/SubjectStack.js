import React from 'react';

// IMPORT COMPONENT
import StudentSubjectScreen from '../../screens/students/StudentSubjectScreen';
import StudentScheduleSubjectScreen from '../../screens/students/StudentScheduleSubjectScreen';

import TeacherSubjectScreen from '../../screens/teachers/TeacherSubjectScreen';
import TeacherSubjectScheduleScreen from '../../screens/teachers/TeacherSubjectScheduleScreen';
import TeacherScheduleClassScreen from '../../screens/teachers/TeacherScheduleClassScreen';

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';

// IMPORT LIBRARY
import {
    Entypo
  } from 'react-native-vector-icons';

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
        initialRouteName: 'StudentSubjectScreen',
        defaultNavigationOptions: {
            headerBackImage: ({ tintColor })=> (
                <Entypo style={[{color: tintColor}]} name="chevron-thin-left" size={25} />
            ),
            headerBackTitle: 'Back',
            ...TransitionPresets.SlideFromRightIOS,
        },
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
            screen: TeacherSubjectScheduleScreen,
            navigationOptions: {
                headerTintColor: COLORS.LIGHT
            }
        },
        TeacherSubjectScheduleClassScreen: {
            screen: TeacherScheduleClassScreen,
            navigationOptions: {
                title: NAVIGATOR.attendance.toUpperCase(),
                headerTintColor: COLORS.LIGHT,
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        }
    },
    {
        initialRouteName: 'TeacherSubjectScreen',
        defaultNavigationOptions: {
            headerBackImage: ({ tintColor })=> (
                <Entypo style={[{color: tintColor}]} name="chevron-thin-left" size={25} />
            ),
            headerBackTitle: 'Back',
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);
