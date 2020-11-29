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
import * as PARAMETER from '../../constants/Parameter';

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
            headerStyle: { backgroundColor: COLORS.LIGHT }
        }
        },
        
    },
    {
        initialRouteName: 'StudentScheduleScreen',
        defaultNavigationOptions: {
            headerTitleStyle: { 
                fontFamily: PARAMETER.FONT_BOLD_MAIN,
                color: COLORS.MAIN_PRIMARY 
            },
            headerBackImage: ()=> (
                <Entypo style={[{color: COLORS.MAIN_PRIMARY}]} name="chevron-thin-left" size={25} />
            ),
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
                headerStyle: { backgroundColor: COLORS.LIGHT }
            }
        },
        TeacherScheduleClassScreen: {
            screen: TeacherScheduleClassScreen,
            navigationOptions: {
                title: NAVIGATOR.attendance.toUpperCase(),
                headerTintColor: COLORS.LIGHT,
                headerTitleAlign: 'left',
                headerStyle: { backgroundColor: COLORS.LIGHT }
            },
        },
    },
    {
        initialRouteName: 'TeacherScheduleScreen',
        defaultNavigationOptions: {
            headerTitleStyle: { 
                fontFamily: PARAMETER.FONT_BOLD_MAIN,
                color: COLORS.MAIN_PRIMARY 
            },
            headerBackImage: ()=> (
                <Entypo style={[{color: COLORS.MAIN_PRIMARY}]} name="chevron-thin-left" size={25} />
            ),
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);