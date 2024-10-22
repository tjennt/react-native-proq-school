import React from 'react';

// IMPORT COMPONETS REACT NATIVE
import { View, Text } from 'react-native';

// IMPORT SCREEN STACK
import LoginComponent from '../components/login/LoginComponent';
import HomeStack from './screens/HomeStack';
import ProfileStack from './screens/ProfileStack';
import MoreStack from './screens/MoreStack';
import { StudentScheduleStack, TeacherScheduleStack } from './screens/ScheduleStack';
import { StudentSubjectStack, TeacherSubjectStack } from './screens/SubjectStack';

import ProfileScreen from '../screens/ProfileScreen';

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
        screen: HomeStack,
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
        screen: StudentScheduleStack,
        navigationOptions: {
            title: NAVIGATOR.schedule,
            tabBarIcon: ({ tintColor }) => (
            <View>
               <AntDesign style={[{color: tintColor}]} size={25} name={'calendar'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT },
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            title: NAVIGATOR.personal,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'person-outline'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT }
        }
    },
    Subject: {
        screen: StudentSubjectStack,
        navigationOptions: {
            title: NAVIGATOR.subject,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'subject'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT },
        }
    },
    More: {
    screen: MoreStack,
    navigationOptions: {
        title: NAVIGATOR.more,
        tabBarIcon: ({ tintColor }) => (
        <View>
            <MaterialIcons style={[{color: tintColor}]} size={25} name={'more-horiz'} />
        </View>
        ),
        activeColor: COLORS.MAIN_PRIMARY,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.LIGHT },
    }
    },
};

// TAB NAVIGATOR TEACHER
export const TEACHER = {
    Home: {
        screen: HomeStack,
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
        screen: TeacherScheduleStack,
        navigationOptions: {
            title: NAVIGATOR.schedule,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <AntDesign style={[{color: tintColor}]} size={25} name={'calendar'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT },
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            title: NAVIGATOR.personal,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'person-outline'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT },
        }
    },
    Subject: {
        screen: TeacherSubjectStack,
        navigationOptions: {
            title: NAVIGATOR.subject,
            tabBarIcon: ({ tintColor }) => (
            <View>
                <MaterialIcons style={[{color: tintColor}]} size={25} name={'subject'} />
            </View>
            ),
            activeColor: COLORS.MAIN_PRIMARY,
            inactiveColor: COLORS.LIGHT_HIGHT,
            barStyle: { backgroundColor: COLORS.LIGHT },
        }
    },
    More: {
    screen: MoreStack,
    navigationOptions: {
        title: NAVIGATOR.more,
        tabBarIcon: ({ tintColor }) => (
        <View>
            <MaterialIcons style={[{color: tintColor}]} size={25} name={'more-horiz'} />
        </View>
        ),
        activeColor: COLORS.MAIN_PRIMARY,
        inactiveColor: COLORS.LIGHT_HIGHT,
        barStyle: { backgroundColor: COLORS.LIGHT },
    }
    },
};