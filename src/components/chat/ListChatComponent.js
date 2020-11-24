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

class ListChatComponent extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        const { messages, user, sendMessageFromMe } = this.props;
        return (
        <SafeAreaView style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(mess) => sendMessageFromMe(mess) }
                user={{
                    _id: user._id,
                }}
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