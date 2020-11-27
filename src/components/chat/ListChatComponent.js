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

import { GiftedChat, Send } from 'react-native-gifted-chat';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

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

// IMPORT LIBRARY
import {
    MaterialIcons 
} from 'react-native-vector-icons';

class ListChatComponent extends Component {

    constructor(props) {
        super(props)
    }

    renderLoading = ()=> {
        return <EmptyData loading={true} stopLoad={true} />
    }
    
    renderEmpty = ()=> {
        return <EmptyData loading={false} stopLoad={false} />
    }

    renderButtonSend = (props)=> {
        return <Send
                {...props}
                containerStyle={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <MaterialIcons style={[{color: COLORS.MAIN_TEXT, fontWeight: 'bold'}]} size={24} name={'send'} />
            </Send>
    }

    render () {
        const { messages, user, sendMessageFromMe } = this.props;
        return (
        <SafeAreaView style={styles.container}>
            <GiftedChat
            
                // List messages
                messages={messages}

                // Send message to api and append
                onSend={(mess) => sendMessageFromMe(mess) }
                
                // Id me
                user={{
                    _id: user._id,
                }}
                
                // Show button send
                alwaysShowSend={true}

                // Loading affter message
                loadEarlier={true}

                // Reverse messages
                inverted={true}

                // Render loading
                renderLoading={this.renderLoading}

                // Render empty
                renderChatEmpty={this.renderEmpty}

                // Render button send
                renderSend={this.renderButtonSend}
            />
        </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ListChatComponent);

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