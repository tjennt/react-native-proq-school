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
// import * as Google from 'expo-google-sign-in';
import * as Google from "expo-google-app-auth";

import * as COLORS from '../../constants/Colors';
import  { LOGIN } from '../../constants/Locale';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT AXIOS
import axios from 'axios';

class LoginComponent extends Component {
    
    signInWithGoogle = async () => {
        // this.login()
        // return;
        try {
          const result = await Google.logInAsync({
            iosClientId: PARAMETER.IOS_CLIENT_ID,
            androidClientId: PARAMETER.ANDROID_CLIENT_ID,
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
              console.log("SUCCESS", result);
                this.loginServerApi()
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log('Error with login', e);
          return { error: true };
        }
    };

    loginServerApi = async ()=> {
        try {
            let res = await axios.post(`${PARAMETER.SERVER_API}/api/login`, {
                userName: 'tiennt',
                passName: '12ba4nam'
            })

            let { data } = res
            if (data) {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    login = ()=> {
        let user = {
            token: 'Bearer erdrfw0jiktjgiom=rqfeodojmpgwer',
            userName: 'natriwit',
            fullName: 'Nguyen Tan Tien',
            avatar: 'image/adsa/dsaf.jpg',
            role: 'student'
        }

        this.props.addUser(user)
        this.props.loginFunction(user)
    }

    render () {
        return (
            <ImageBackground
                source={ { uri: require('../../assets/images/illustrators/notebook.svg') } }
                style={ styles.imageBackground }
            >      
                {/* Logo image */}
                <View style={ styles.container }>
                    <Image 
                        source={ { uri: require('../../assets/images/logos/logo_black.png') } }
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
                            source= { { uri: require('../../assets/images/illustrators/gifs/classroom.gif') } }  
                        />
                        <View style= { styles.marginCard }>
                            <Text>{ LOGIN.introductLogin }</Text>
                        </View>

                        {/* Login google */}
                        <TouchableOpacity
                            onPress={ this.signInWithGoogle }
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, actions)(LoginComponent);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 55
    },
    introduce: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 55
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
        paddingBottom: 20 
    }
});