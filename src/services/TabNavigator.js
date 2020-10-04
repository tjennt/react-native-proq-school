import React from 'react';

// IMPORT COMPONETS REACT NATIVE
import { View } from 'react-native';

// IMPORT SCREEN
import HomeScreen from '../sreens/HomeScreen';
import ProfileScreen from '../sreens/ProfileScreen';
import SettingScreen from '../sreens/SettingScreen';

// IMPORT LIBRARY
import Icon from 'react-native-vector-icons/Ionicons';


// TAB NAVIGATOR STUDENT
export const STUDENT = {
    Home: {
    screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
            <View>
                <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
            </View>
            ),
        }
    },
    Profile: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#2163f6' },
    }
    },
    History: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-images'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#2c6d6a' },
    }
    },
    Cart: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
    }
    },
    Setting: {
    screen: SettingScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-grid'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#393939' },
    }
    },
};

// TAB NAVIGATOR TEACHER
export const TEACHER = {
    Home: {
    screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
            <View>
                <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
            </View>
            ),
        }
    },
    Profile: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#2163f6' },
    }
    },
    History: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-images'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#2c6d6a' },
    }
    },
    Setting: {
    screen: SettingScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-grid'} />
        </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#393939' },
    }
    }
};