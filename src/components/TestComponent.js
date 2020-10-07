import React, { Component } from 'react';

import { ActivityIndicator,
    StyleSheet,
    TouchableOpacity, 
    ImageBackground,
    View, Text } from 'react-native';

export default class TestComponent extends Component {
    render () {
        return (
            <View><Text>{ this.props.title }</Text></View>
        )
    }
}