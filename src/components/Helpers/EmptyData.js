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
// 
import * as Colors from '../../constants/Colors';

export default class EmptyData extends Component {
    
    constructor(props) {
        super(props)
    }

    checkLoadingOrEmpty = ()=> {
        const { loading, stopLoad } = this.props
        if ( loading) {
            return <ActivityIndicator
                size="large"
                color={Colors.MAIN_PRIMARY} 
                animating={true} />
        }
        if (stopLoad) {
            return 
        }
        return <Text style={ { textAlign: 'center' } }>Không có dữ liệu...</Text>
    }
    render () {
        return (
            <View style={ { flex: 1, justifyContent: 'center' } }>
                {
                    this.checkLoadingOrEmpty()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
    }
  });