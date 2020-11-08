import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator } from 'react-native';
  
  import { Button, 
    Text, 
    ThemeProvider, 
    ListItem, 
    Avatar, 
    SearchBar } from 'react-native-elements';

export default class EmptyData extends Component {
    render () {
        return (
            <View style={ { flex: 1, justifyContent: 'center' } }>
                <Text style={ { textAlign: 'center' } }>Không có dữ liệu...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
    }
  });