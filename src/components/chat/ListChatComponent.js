import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    TouchableOpacity } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Avatar } from 'react-native-elements';

import { GiftedChat } from 'react-native-gifted-chat';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

import Toggle from 'react-native-toggle-element';

// Service 
import * as HelperService from '../../services/HelperService';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT SOCKET IO CLIENT
import socketIO from "socket.io-client";

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

import GLOBAL_STYLES from '../../styles';

export default class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'CAK',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                    sent: true
                },
                {
                    _id: 3,
                    text: 'HEllo bro',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                    user: {
                      _id: 1,
                      name: 'React Native',
                      avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                    sent: true
                }
            ]
        }
    }

    navigateChat = (user)=> {
        // console.log(this.props);
        this.props.navigation.push('ChatScreen', {
            data: user
        })
    }

    keyExtractor = (user, index) => index.toString()

    renderItem = ({ item, index }) => (
        <TouchableOpacity 
            onPress={()=> this.navigateChat(item)}
            key={index}
            style={styles.ViewUser}
        >
            <Image
                style={ styles.ImageAvatar }
                resizeMode="cover"
                source={ require('../../assets/images/demo/anh_the.jpg') }
            />
            
            <View style={ styles.ViewNameDes }>
                <Text style={ [GLOBAL_STYLES.TextTitleStyle,  styles.TextName] }>
                    { item.name }
                </Text>
                <ListItem.Title style={ [GLOBAL_STYLES.TextStyle,  styles.TextDes] }>
                    Hi em, anh dung day tu chieu ne. · 19:03
                </ListItem.Title>
            </View>
        
        </TouchableOpacity>
    )

    sendMessage = (mess)=> {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, mess),
        }));
    }

    render () {
        const { messages } = this.state;
        return (
        <SafeAreaView style={styles.container}>
            
            {/* <FlatList
                keyExtractor={this.keyExtractor}
                data={users}
                renderItem={this.renderItem}
            /> */}

            <GiftedChat
                messages={messages}
                onSend={(mess) => this.sendMessage(mess) }
                user={{
                    _id: 1,
                }}
            />

        </SafeAreaView>
        )
    }
}

// const mapStateToProps = state => ({
//     user: state.user
// });

// export default connect(mapStateToProps, null)(ListClassScheduleTeacherComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 0
    },
    ViewUser: {
        flexDirection: 'row',
        paddingBottom: 15
    },
    ViewNameDes: {
        flexDirection: 'column'
    },
    ImageAvatar: {
        width: 55,
        height: 55,
        borderRadius: 55
    },
    TextName: {
        paddingTop: 5,
        paddingLeft: 10
    },
    TextDes: {
        paddingLeft: 10,
        fontSize: 14
    }
});