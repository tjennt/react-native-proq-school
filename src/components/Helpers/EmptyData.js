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

import GLOBAL_STYLES from '../../styles';

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
            return <View />
        }
        return <View style={ styles.container }>
            <Image
                style={styles.EmptyData}
                source={require('../../assets/images/illustrators/empty-data.png')}
            />
            <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.Text] }>Không tìm thấy dữ liệu</Text>
        </View>
    }

    styleView = ()=> {
        const { loading, stopLoad } = this.props

        let style = styles.viewContainer
        if ( loading) {
            return style
        }
        if (stopLoad) {
            return {}
        }
        return style
    }

    render () {
        const { loading, stopLoad } = this.props
        return (
            <View 
            style={ 
                this.styleView()
            }>
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
    viewContainer: { 
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 25
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