import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    YellowBox, 
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

// IMPORT AXIOS SERVICE
import * as chatService from '../../services/api/chat/chatService';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import GLOBAL_STYLES from '../../styles/Global';

// IMPORT SOCKET IO CLIENT
import io from "socket.io-client";

// IMPORT REDUX
import * as actions from '../../actions';

import { connect } from 'react-redux';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        messages: [],
        userRedux: {},
        dataUserSend: {},
        dataRoom: {}
    }
  }
  
  async componentDidMount () {
    const { navigation } = this.props
    
    await this.setState({
      userRedux: navigation.getParam('user'),
      dataUserSend: navigation.getParam('data')
    })

    this.chat = io(PARAMETER.SERVER);

    this.chat.on("SEND_MESSAGE_CHAT", data => {
        const { userRedux, dataRoom } = this.state

        // console.log({
        //   idRedux: userRedux._id,
        //   id_from:  data.from,
        //   id_room: dataRoom._id,
        //   group_id: data.group._id
        // })
        
        if (
          userRedux._id != data.from &&
          dataRoom._id == data.group._id
        ) {
          this.setState({
            messages: [chatService.mapMessage(data), ...this.state.messages]
          })
        }

    })

    this.getListChatOrCreate()
  }

  getListChatOrCreate = async ()=> {
    const { userRedux, dataUserSend } = this.state
    
    try {
      let data = await chatService.getGroupOrCreate({
        userIdSend: dataUserSend.id,
        user: userRedux
      })
      this.setState({
        dataRoom: data.dataRoom,
        messages: chatService.mapMessages(data.messages),
        loading: false,
        stopLoad: true
      })
      // console.log({
      //   dataRoom: data.dataRoom,
      //   messages: chatService.mapMessages(data.messages),
      //   loading: false,
      //   stopLoad: true
      // });
    } catch (error) {
      console.log(error);
    }

  }
  
  // Message me append
  sendMessageFromMe = async (data)=> {
    const { dataRoom, userRedux } = this.state
    await this.setState({
      messages: [data[0], ...this.state.messages]
    })
    console.log(data);
    // 
    try {
      let res = chatService.postChat({
        groupId: dataRoom._id,
        content: data[0].text,
        user: userRedux
      })
    } catch (error) {
      console.log(error); 
    }
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { messages, loading, stopLoad } = this.state
    const { navigation } = this.props
    if (loading) {
      return <EmptyData loading={ loading } stopLoad={stopLoad} />
    } else {
     return <ListChatComponent 
              messages={messages}
              sendMessageFromMe={ this.sendMessageFromMe }
              navigation={navigation}
            />
    }
  }
  render() {
    const { categories, news, loadingNews } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex:1, backgroundColor: COLORS.LIGHT }}>
        {
          this.viewNewsOrLoader()
        }
      </View>
    )
  }
}


// const mapStateToProps = state => ({
//     user: state.user
// });

// export default connect(mapStateToProps, null)(ChatScreen);


const styles = StyleSheet.create({
    ViewRender: {
      flex: 1,
      padding: 10
    }
});