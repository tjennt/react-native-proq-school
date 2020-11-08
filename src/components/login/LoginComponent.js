import React, { Component } from 'react';

import { ActivityIndicator,
    StyleSheet, 
    ImageBackground,
    View,
    TouchableOpacity, 
    ScrollView} from 'react-native';

import { Image,
    Text,
    SocialIcon,
    Card,
    Input,
    Button } from 'react-native-elements';

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

// IMPORT SVG BACKGROUND 

class LoginComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            loginType: true,
            userName: '',
            password: ''
        }
    }
    signInWithGoogle = async () => {
        
        // LOGIN DON'T NEED LOGIN
        // this.loginSuccess({
        //     token: 'eyeafa23rewgds',
        //     email: 'toma.nguyen675@gmail.com'
        // })
        // return;
        this.setState({ loading: true })

        try {
            const result = await Google.logInAsync({
                androidClientId: PARAMETER.ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });
    
            if (result.type === "success") {
                console.log(result)
                return this.loginServerApi(result)

            } else {
                this.setState({ loading: false })
            }
        } catch (e) {
            console.log('Error with login', e);
            return { error: true };
        }
    };

    setLoading = ()=> {
        this.setState({
            loading: true
        })
    }

    loginServerApi = async (dataGoogle)=> {
        try {
            console.log('LOGIN SERVER')
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
        const { token } = dataLogin
        try {
            let res = await axios.get(`${PARAMETER.SERVER}/v1/student/profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            let { data } = res

            if (data.success == true) {
                console.log(data)
                data.payload.role = dataLogin.access
                this.props.addUser(data.payload)
                this.props.loginFunction({
                    role: dataLogin.access
                })
            }
            
        } catch (error) {
            console.log("error", error)
        }
    }

    // Login with account
    signInAccount = async ()=> {
        alert('LOGIN SUCCESS')
    }

    loginFail = ()=> {
        
    }

    // Button render type login
    buttonRenderTypeLogin = ()=> {
        const { loading, loginType } = this.state
        if (loading){
            return (
                <View></View>
            )
        }
        return (
            <TouchableOpacity 
                style={ { paddingTop: 5, paddingBottom: 20, paddingRight: 15 } }
                onPress={ ()=>{ this.setState({ loginType: !loginType }) } }
                >
                <Text style={ { textAlign: 'right' } }>
                    { !loginType ? 'Đăng nhập với google' : 'Đăng nhập với tài khoản' }
                </Text>
            </TouchableOpacity>
        )
    }

    // Login google or account
    viewLoginGoogleOrAccount = ()=> {
        const { userName, password } = this.state
        return (
            <View style={ { paddingTop: 15 } }>
                <Text style={ styles.TextInputAccout }>Tài khoản</Text>
                <Input
                    placeholder="proschool"
                    rightIcon={{ type: 'font-awesome', name: 'user', size:15 }}
                    inputContainerStyle={ { 
                        fontSize: 10
                    } }
                    labelStyle={{fontSize: 5}}
                    onChangeText={value => this.setState({ userName: value })}
                />
                <Text style={ styles.TextInputAccout }>Mật khẩu</Text>
                <Input
                    rightIcon={{ type: 'font-awesome', name: 'key', size:15 }}
                    placeholder="••••••••"
                    secureTextEntry={true}
                    onChangeText={value => this.setState({ password: value })}
                />
                <View style={ { flexDirection: "row", alignSelf: 'center' } }>
                    <Button
                        buttonStyle={ {
                            borderColor: COLORS.PRIMARY,
                            width: '100%',
                            marginTop: 5,
                            padding: 15,
                            borderRadius: 30
                        } }
                        titleStyle={ {
                            color: COLORS.PRIMARY
                        } }
                        disabled={ userName.length != 0 && password.length != 0 ? false : true }
                        title="Đăng nhập"
                        type="outline"
                        onPress={ ()=> { this.signInAccount() } }
                    ></Button>
                    <SocialIcon
                        title= { LOGIN.loginWithGoole }
                        light
                        type= 'google'
                        onPress={ ()=> { this.signInWithGoogle() } }
                    />
                </View>

            </View>
        )
    }

    render () {
        const { loginType } = this.state

        return (
            // loading={this.state.loading}
            <ImageBackground
                style={ styles.imageBackground }
                source={ require('../../assets/images/illustrators/notebook.png') }
            >
                <ScrollView>      
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
                        <Card style= { {} }>
                        
                            <Text style= { { fontSize: 18, fontWeight: 'bold', textAlign: 'center' } }> { LOGIN.login.toUpperCase() }</Text>

                            <View style= { styles.marginCard }>
                                { this.viewLoginGoogleOrAccount() }
                            </View>

                            {/* <Text>{ LOGIN.introductLogin }</Text> */}
                        
                        </Card>
                    </View>

                </ScrollView>
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
        paddingTop: 60
    },
    introduce: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
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
    },
    TextInputAccout: {
        paddingLeft: 10,
        fontWeight: '700'
    }
});