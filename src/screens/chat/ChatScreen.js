import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Avatar } from 'react-native-elements';

import STYLE_GOBAL from '../../styles';

// IMPORT HEADER
import Header from '../../components/headers/DefaultHeaderComponent';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

import * as COLORS from '../../constants/Colors';
import Constants from 'expo-constants';

// IMPORT COMPONENT HOME SCREEN
import ListChatComponent from '../../components/chat/ListChatComponent';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import GLOBAL_STYLES from '../../styles/Global';

const messages = [
    {
        from: '1',
        to: '2',
        userSenderName: 'Tà A Lũ',
        userName: 'Nguyễn Tấn Tiền',
        text: 'Hi Bro',
        time: '10:50'
    },
    {
        from: '1',
        to: '2',
        userSenderName: 'Tà A Lũ',
        userName: 'Nguyễn Tấn Tiền',
        text: 'Hi Bro',
        time: '10:50'
    },
    {
        from: '2',
        to: '1',
        userSenderName: 'Tà A Lũ',
        userName: 'Nguyễn Tấn Tiền',
        text: 'Hi Bro',
        time: '10:50'
    },
];

// IMPORT SOCKET IO CLIENT
import io from "socket.io-client";

export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        messages: []
    }
  }
  
  componentDidMount() {
      const { loading, stopLoad } = this.state
      setTimeout(()=> {
        this.setState({loading: false, stopLoad: true, messages: messages})
      }, 200)
    
        this.chat = io(PARAMETER.SERVER);
        this.chat.on("server-send-message-to-client", msg => {
            this.setState({ messages: [...this.state.messages, msg]});
        });
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { messages, loading, stopLoad } = this.state
    const { navigation } = this.props
    if (loading) {

      return <EmptyData loading={ loading } stopLoad={stopLoad} />

    } else {

     return <ListChatComponent messages={messages} navigation={navigation} />
    }
  }

  sendChatToServer = ()=> {
    this.chat.emit("client-send-message-to-server", {
        message: 'MOBILE TEST',
        fullName: 'Tien',
        avatar: 'image.png'
      });
  }
  render() {
    const { categories, news, loadingNews } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex:1, backgroundColor: COLORS.LIGHT }}>
        <Button
            title="CHAT"
            onPress={ ()=> this.sendChatToServer() }
        />
        {
            this.state.messages.map((user)=> {
                return <Text>{user.message}</Text>
            })
        }
        {
          this.viewNewsOrLoader()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    ViewRender: {
      flex: 1,
      padding: 10
    }
});