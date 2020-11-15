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
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    signInWithGoogle = async () => {
        try {
            this.setState({ loading: true })
            const result = await Google.logInAsync({
                androidClientId: PARAMETER.ANDROID_CLIENT_ID,
                androidStandaloneAppClientId: PARAMETER.ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });
    
            if (result.type === "success") {
                this.loginServerApi(result)
            } else {
                this.setState({ loading: false })
                console.log("Out login")
            }
        } catch (e) {
            console.log('Error with login', e);
            return { error: true };
        }
    };

    setLoading = ()=> {
        this.setState({
            loading: !this.state.loading
        })
    }

    loginServerApi = async (dataGoogle)=> {
        try {
            let res = await axios.post(`${PARAMETER.SERVER}/v1/users/android/google/login`, {
                tokenId: dataGoogle.idToken
            })
            let { data } = res
            if (data.success === true){
                // console.log(data)
                return this.loginSuccess(data.payload)
            }
            return this.loginFail()

        } catch (error) {
            console.log("error", error)
        }
    }
    
    loginSuccess = async (dataLogin)=> {
        const { token, access } = dataLogin
        const Faketoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE2OTcyOGE2ZjQ2OWYwNmQ2ODc1NmQiLCJ0ZWFjaGVySWQiOnsiYXZhdGFyIjoidXBsb2Fkcy91c2VyLWF2YXRhci9kZWZhdWx0LmpwZyIsIl9pZCI6IjVmYTY5NzI4YTZmNDY5ZjA2ZDY4NzU2YiIsInRlYWNoZXJDb2RlIjoiR1YxMTEiLCJmdWxsbmFtZSI6IkNow6J1IFRo4bq_IE5pbmgiLCJwaG9uZSI6IjE2NDc4NDE3MiIsImRvYiI6IjIwLzEwLzE5ODAiLCJzcGVjaWFsaXphdGlvbiI6ImpzIiwiX192IjowLCJjcmVhdGVkQXQiOiIyMDIwLTExLTA3VDEyOjQ2OjMyLjc2MVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTA3VDEyOjQ2OjMyLjc2MVoifSwic3R1ZGVudElkIjpudWxsLCJhY2Nlc3MiOiJ0ZWFjaGVyIiwiaWF0IjoxNjA0ODIyMjYyLCJleHAiOjE2MDU2ODYyNjJ9.N29lWjzGh6xtcL6bdn9PETJWkjFZbmutnJN9eiK-vi0";
        try {
            let res = await axios.get(`${PARAMETER.SERVER}/v1/${access}/profile/`, {
                headers: {
                    'Authorization': `Bearer ${dataLogin.token}`
                }
            })

            let { data } = res

            if (data.success == true) {
                data.payload.role = dataLogin.access
                data.payload.token = dataLogin.token
                // data.payload.token = Faketoken
                this.props.addUser(data.payload)
                this.props.loginFunction({
                    role: dataLogin.access
                })
            }
            
        } catch (error) {
            console.log("error", error)
        }
    }

    loginFail = ()=> {
        
    }

    render () {
        const { loading } = this.state
        return (
            <ImageBackground
                source={ require('../../assets/images/illustrators/notebook.png') }
                style={ styles.imageBackground }
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
                        <View style= { styles.marginCard }>
                            <Text>{ LOGIN.introductLogin }</Text>
                        </View>

                        {/* Login google */}
                        {/* <Text>{ this.state.loading ? 'Loading....' : '' }</Text> */}
                        <TouchableOpacity
                            onPress={ this.signInWithGoogle }
                            // disabled={true}
                        >
                            <SocialIcon
                                title= { LOGIN.loginWithGoole }
                                button
                                type= 'google'
                                loading={loading}
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
        paddingTop: 30
    },
    introduce: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
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
        paddingBottom: 40 
    }
});