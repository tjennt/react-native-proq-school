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
        
        // LOGIN DON'T NEED LOGIN
        this.loginSuccess({
            token: 'eyeafa23rewgds',
            email: 'toma.nguyen675@gmail.com'
        })
        return;

        try {
            this.setLoading()
            const result = await Google.logInAsync({
                iosClientId: PARAMETER.IOS_CLIENT_ID,
                androidClientId: PARAMETER.ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });
    
            if (result.type === "success") {
                
                this.loginServerApi(result)

            } else {
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
            let res = await axios.post(`${PARAMETER.SERVER}/androi/auth/google`, {
                idToken: dataGoogle.idToken
            })
            let { data } = res
            if (data.success === true){
                return this.loginSuccess(data.payload)
            }
            return this.loginFail()

        } catch (error) {
            console.log("error", error)
        }
    }
    
    loginSuccess = (data)=> {
        let user = {
            token: data.token,
            email: data.email,
            studentCode: 'ps09110',
            userName: 'tienntps09110',
            fullName: 'Nguyễn Tấn Tiền',
            avatar: 'image/adsa/dsaf.jpg',
            className: 'WD14301',
            role: 'student'
        }

        this.props.addUser(user)
        this.props.loginFunction(user)
    }

    loginFail = ()=> {
        
    }

    render () {
        return (
            <ImageBackground
                source={ require('../../assets/images/illustrators/notebook.svg') }
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
                        <Text>{ this.state.loading ? 'Loading....' : '' }</Text>
                        <TouchableOpacity
                            onPress={ this.signInWithGoogle }
                            // disabled={true}
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