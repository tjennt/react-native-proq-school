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

export default class ChatScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('data').fullName.toUpperCase(),
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.MAIN_PRIMARY
    },
    headerStyle: { backgroundColor: COLORS.LIGHT },
  });

  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        messages: [],
        userRedux: {},
        dataUserSend: {},
        dataRoom: {},
        total_page: 0,
        page: 0
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
        // Check mess
        if (
          data.group.members.includes(userRedux._id) &&
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
        total_page: data.total_page,
        page: data.page,
        loading: false,
        stopLoad: true,
        isLoadingEarlier: false
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  // Message me append
  sendMessageFromMe = async (data)=> {
    const { dataRoom, userRedux } = this.state
    
    try {
      let res = await chatService.postChat({
        groupId: dataRoom._id,
        content: data[0].text,
        user: userRedux
      })
    } catch (error) {
      console.log(error); 
    }
  }

  getMessagesEarlier = async ()=> {
    const { dataRoom, userRedux, total_page, page,dataUserSend } = this.state
    let pageResult = page + 1

    if(pageResult > total_page) {
      return
    }
    await this.setState({
      isLoadingEarlier: true
    })
    try {
      
      let data = await chatService.getChats({
        group: dataRoom,
        user: userRedux,
        params: {
          page: pageResult
        }
      })
      this.setState({
        messages: [...this.state.messages, ...chatService.mapMessages(data.payload)],
        page: data.page,
        isLoadingEarlier: false
      })
    } catch (error) {
       
    }
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { messages, loading, stopLoad, page, total_page, isLoadingEarlier } = this.state
    const { navigation } = this.props
    if (loading) {
      return <EmptyData loading={ loading } stopLoad={stopLoad} />
    } else {
     return <ListChatComponent 
              messages={messages}
              page={page}
              totalPage={total_page}
              isLoadingEarlier={isLoadingEarlier}
              sendMessageFromMe={this.sendMessageFromMe}
              getMessagesEarlier={this.getMessagesEarlier}
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