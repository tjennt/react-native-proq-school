import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    Image,
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
        return <View style={ styles.container }>
            <Image
                style={styles.EmptyData}
                source={require('../../assets/images/illustrators/empty-data.png')}
            />
            <Text style={ styles.Text }>Không tìm thấy dữ liệu</Text>
        </View>
    }
    render () {
        return (
            <View style={ { 
                flex: 1,
                justifyContent: 'center',
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 10 } }>
                {
                    this.checkLoadingOrEmpty()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyData: {
        width: '100%',
        height: 300
    },
    Text: { 
        color: Colors.MAIN_PRIMARY,
        fontSize: 20,
        textAlign: 'center'
    }
});