import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    ActivityIndicator } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Avatar } from 'react-native-elements';

import { 
    GiftedChat,
    Send,
    LoadEarlier,
    Bubble,
    InputToolbar } from 'react-native-gifted-chat';

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
import { APP } from '../../constants/Locale';

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

    renderLoadingEarlier = (props)=> {
        return  <LoadEarlier
                    {...props}
                    wrapperStyle={{ backgroundColor: COLORS.LIGHT }}
                    activityIndicatorStyle={{ backgroundColor: COLORS.LIGHT }}
                    activityIndicatorColor={COLORS.MAIN_TEXT}
                    isLoadingEarlier={true} />
    }

    renderBubble = (props)=> {
        return <Bubble 
                    {...props}
                    wrapperStyle={ {
                        right: {
                            backgroundColor :  COLORS.MAIN_TEXT
                        },
                    } }
                />
    }

    render () {
        const { 
            messages,
            user,
            sendMessageFromMe,
            getMessagesEarlier,
            page,
            totalPage,
            isLoadingEarlier
        } = this.props;

        return (
        <SafeAreaView style={styles.container}>
            <GiftedChat

                placeholder={APP.message}
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
                infiniteScroll={true}
                
                // Loading affter message
                loadEarlier={page < totalPage ? true : false}
                isLoadingEarlier={isLoadingEarlier}
                renderLoadEarlier={this.renderLoadingEarlier}
                onLoadEarlier={()=> getMessagesEarlier() }

                // Render loading
                renderLoading={this.renderLoading}

                // Render empty
                // renderChatEmpty={this.renderEmpty}

                // Render button send
                renderSend={this.renderButtonSend}
                // Reverse messages
                inverted={true}

                // render bubble
                renderBubble={this.renderBubble}

                // Max input lenth
                maxInputLength={500}

                textInputStyle={
                    {
                        borderRadius: 10,
                        padding: 10,
                        borderColor: COLORS.MAIN_TEXT,
                        borderWidth: 1 
                    }
                }

                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={
                            {
                                borderTopWidth: 0,
                                paddingTop: 5,
                                paddingBottom: 5
                            }
                        }
                    />
                )}
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