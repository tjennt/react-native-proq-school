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
import * as PARAMETER from '../../constants/Parameter';

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
            headerStyle: { backgroundColor: COLORS.LIGHT }
        }
        },
        StudentScheduleSubjectScreen: {
            screen: StudentScheduleSubjectScreen
        }
    },
    {
        initialRouteName: 'StudentSubjectScreen',
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

export const TeacherSubjectStack = createStackNavigator(
    {
        TeacherSubjectScreen: {
        screen: TeacherSubjectScreen,
        navigationOptions: {
            title: NAVIGATOR.subjectTeacher.toUpperCase(),
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: COLORS.LIGHT }
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
                headerStyle: { backgroundColor: COLORS.LIGHT }
            }
        }
    },
    {
        initialRouteName: 'TeacherSubjectScreen',
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
