import React, { Component } from 'react';

import { ActivityIndicator,
    StyleSheet,
    TouchableOpacity, 
    ImageBackground,
    View,
    Alert } from 'react-native';

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

// IMPORT HELPER SERVICE
import { _storeData, _retrieveData } from '../../services/HelperService';

// import GLOBAL_STYLES from '../../styles/Global';


const GLOBAL_STYLES = {
    ButtonStyle: {
        color: 'red'
    }
}

class LoginComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        setTimeout(()=> {
            this.loginWhenAsyncData()
        }, 500)
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
            }
        } catch (e) {
            console.log('Error with login', e);
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
                return this.loginSuccess(data.payload)
            }
            return this.loginFail()

        } catch (error) {
            console.log("error", error)
            return this.loginFail()
        }
    }
    
    loginSuccess = async (dataLogin)=> {
        const { token, access } = dataLogin
        console.log(dataLogin)
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
                
                _storeData({
                    key: 'user',
                    value: JSON.stringify(data)
                })
                this.props.addUser(data.payload)
                this.props.loginFunction({
                    role: dataLogin.access
                })
            }
            
        } catch (error) {
            console.log("error", error)
        }
    }

    loginWhenAsyncData = async ()=> {
        try {
            let user = await _retrieveData('user')
            if (user == null) {
                // this.setState({loading: false})
                return false
            }
            this.setState({loading: true})
            user = JSON.parse(user)
            // console.log(user)
            this.props.addUser(user.payload)
            
            this.props.loginFunction({
                role: user.payload.role
            })
            
        } catch (error) {
            this.setState({loading: false})
            console.log(error)
        }
    }

    loginFail = ()=> {
        this.setState({ loading: false })
        Alert.alert('Cảnh báo', 'Đăng nhập thất bại, vui lòng thử lại!')
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
                    <Text style={ [GLOBAL_STYLES.ButtonStyle, { fontSize: 25 }] }> 
                        { LOGIN.appName }
                    </Text>

                </View>

                {/* Introduce */}
                <View style= { styles.introduce }>
                    <Card style= { {width: 200 } }>
                        <Text style= { [GLOBAL_STYLES.ButtonStyle, { fontSize: 17 }] }> { LOGIN.welcome }</Text>
                        
                        {/* <Card.Divider/> */}
                        <Card.Image
                            style= { { height: 200, marginBottom: 15 } }
                            source= { require('../../assets/images/illustrators/gifs/classroom.gif') }  
                        />
                        <View style= { styles.marginCard }>
                            <Text style={[GLOBAL_STYLES.ButtonStyle]}>{ LOGIN.introductLogin }</Text>
                        </View>

                        {/* Login google */}
                        <TouchableOpacity
                            onPress={ this.signInWithGoogle }
                            // disabled={true}
                        >
                            <SocialIcon
                                title= { LOGIN.loginWithGoole }
                                titleStyle={GLOBAL_STYLES.ButtonStyle}
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