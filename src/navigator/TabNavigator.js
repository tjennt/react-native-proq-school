import React from 'react';

// IMPORT COMPONETS REACT NATIVE
import { View, Text } from 'react-native';

// IMPORT SCREEN
// import HomeScreen from '../sreens/HomeScreen';
import HomeScreen from './screens/HomeStack';

import ProfileScreen from '../screens/ProfileScreen';
import MoreScreen from '../screens/MoreScreen';

// IMPORT STUDENT SCREEN
import StudentScheduleScreen from '../screens/students/StudentScheduleScreen';
import StudentSubjectScreen from '../screens/students/StudentSubjectScreen';

// IMPORT STUDENT SCREEN
import TeacherScheduleScreen from '../screens/teachers/TeacherScheduleScreen';
import TeacherSubjectScreen from '../screens/teachers/TeacherSubjectScreen';

// IMPORT LIBRARY
import {Ionicons,
        MaterialIcons,
        AntDesign 
    } from 'react-native-vector-icons';

// IMPORT LOCALE
import { LOGIN, NAVIGATOR } from '../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../constants/Colors';

// TAB NAVIGATOR STUDENT
export const STUDENT = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: NAVIGATOR.home,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <AntDesign style={[{color: tintColor}]} size={25} name={'home'} />
            </View>
            )
        }
    },
    Schedule: {
        screen: StudentScheduleScreen,
        navigationOptions: {
            title: NAVIGATOR.schedule,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'schedule'} />
            </View>
            ),
            tabBarBadge: 3,
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            title: NAVIGATOR.personal,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'person-outline'} />
            </View>
            ),
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    Subject: {
        screen: StudentSubjectScreen,
        navigationOptions: {
            title: NAVIGATOR.subject,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'subject'} />
            </View>
            ),
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    More: {
    screen: MoreScreen,
    navigationOptions: {
        title: NAVIGATOR.more,
        tabBarIcon: ({ tintColor }) => (
        <View>
            <MaterialIcons style={[{color: tintColor}]} size={25} name={'more-horiz'} />
        </View>
        ),
        activeColor: COLORS.LIGHT,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
    }
    },
};

// TAB NAVIGATOR TEACHER
export const TEACHER = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: NAVIGATOR.home,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <AntDesign style={[{color: tintColor}]} size={25} name={'home'} />
            </View>
            )
        }
    },
    Schedule: {
        screen: TeacherScheduleScreen,
        navigationOptions: {
            title: NAVIGATOR.schedule,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'schedule'} />
            </View>
            ),
            tabBarBadge: 3,
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            title: NAVIGATOR.personal,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'person-outline'} />
            </View>
            ),
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    Subject: {
        screen: TeacherSubjectScreen,
        navigationOptions: {
            title: NAVIGATOR.subject,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'subject'} />
            </View>
            ),
            activeColor: COLORS.LIGHT,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
        }
    },
    More: {
    screen: MoreScreen,
    navigationOptions: {
        title: NAVIGATOR.more,
        tabBarIcon: ({ tintColor }) => (
        <View>
            <MaterialIcons style={[{color: tintColor}]} size={25} name={'more-horiz'} />
        </View>
        ),
        activeColor: COLORS.LIGHT,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.MAIN_PRIMARY },
    }
    },
};