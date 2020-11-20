import React from 'react';

// IMPORT COMPONENT
import StudentScheduleScreen from '../../screens/students/StudentScheduleScreen';
import TeacherScheduleScreen from '../../screens/teachers/TeacherScheduleScreen';
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
        initialRouteName: 'StudentScheduleScreen',
        defaultNavigationOptions: {
            headerBackImage: ({ tintColor })=> (
                <Entypo style={[{color: tintColor}]} name="chevron-thin-left" size={25} />
            ),
            headerBackTitle: 'Back',
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export const TeacherScheduleStack = createStackNavigator(
    {
        TeacherScheduleScreen: {
        screen: TeacherScheduleScreen,
        navigationOptions: {
                title: NAVIGATOR.scheduleTeacherWeek,
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            }
        },
        TeacherScheduleClassScreen: {
            screen: TeacherScheduleClassScreen,
            navigationOptions: {
                title: NAVIGATOR.attendance.toUpperCase(),
                headerTintColor: COLORS.LIGHT,
                headerTitleAlign: 'left',
                headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
                headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
            },
        },
    },
    {
        initialRouteName: 'TeacherScheduleScreen',
        defaultNavigationOptions: {
            headerBackImage: ({ tintColor })=> (
                <Entypo style={[{color: tintColor}]} name="chevron-thin-left" size={25} />
            ),
            headerBackTitle: 'Back',
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);