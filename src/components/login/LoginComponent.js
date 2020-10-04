import React, { Component } from 'react';

import { ActivityIndicator,
    StyleSheet,
    TouchableOpacity, ImageBackground } from 'react-native';

import { Image,
    ThemeProvider, 
    Button, 
    Text,
    SocialIcon } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';


export default class HeaderDefaultComponent extends Component {
    render () {
        const title = this.props.title || 'HEADER';
        const backgroundColor = this.props.backgroundColor || COLORS.PRIMARY;
        return (
            <ThemeProvider style={ styles.themeProvider }>
                <ImageBackground 
                    source={ require('../../assets/images/bg/bg_login.jpg') } 
                    style={styles.image}
                >      
                    <Text>{ this.props.loading ? 'loading...' : '' }</Text>
                    <TouchableOpacity
                        onPress= { ()=> this.props.loginFunction() }
                    >
                            {/* loading = { this.props.loading } */}
                        <SocialIcon
                            title='Đăng nhập với google'
                            button
                            type='google'
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </ThemeProvider>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});