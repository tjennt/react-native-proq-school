import React, { Component } from 'react';

import { ActivityIndicator,
    StyleSheet,
    TouchableOpacity, 
    ImageBackground,
    View } from 'react-native';

import { Image,
    Avatar,
    Accessory,
    Text,
    SocialIcon,
    Card } from 'react-native-elements';

// IMPORT LIBRARY
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORT LOGIN GOOGLE
import * as GoogleSignIn from 'expo-google-sign-in';

import * as COLORS from '../../constants/Colors';
import  { LOGIN } from '../../constants/Locale';



export default class HeaderDefaultComponent extends Component {
    render () {
        return (
            <ImageBackground
                source={ require('../../assets/images/illustrators/notebook.svg') }
                style={ styles.imageBackground }
                blurRadius = '3'
            >      
                {/* Logo image */}
                <View style={ styles.container }>
                    <Image 
                        source={ require('../../assets/images/logos/logo_black.png') }
                        style={ styles.imageLogo }
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator />}
                    >
                    </Image>
                    <Text h4 style={ { fontWeight: 'bold' } }> 
                        { LOGIN.appName }
                    </Text>
                </View>

                {/* Introduce */}
                <View style= { styles.introduce }>
                    <Card style= { {width: 200 } }>
                        <Text style= { { fontSize: 17, fontWeight: 'bold' } }> { LOGIN.welcome }</Text>
                        
                        {/* <Card.Divider/> */}
                        <Card.Image
                            style= { { height: 200, marginBottom: 15 } }
                            source= { require('../../assets/images/illustrators/gifs/classroom.gif') }  
                        />
                        <Text style= { styles.marginCard }>
                            { LOGIN.introductLogin }
                        </Text>

                        {/* Login google */}
                        <TouchableOpacity
                            onPress= { ()=> this.props.loginFunction() }
                        >
                            <SocialIcon
                                title= { LOGIN.loginWithGoole }
                                button
                                type= 'google'
                                loading={this.props.loading}
                            />
                        </TouchableOpacity>
                    </Card>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    introduce: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover"
    },
    imageLogo: {
        width: 100,
        height: 100
    },
    marginCard: {
        marginBottom: 15 
    }
});