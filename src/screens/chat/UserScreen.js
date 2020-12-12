import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ToastAndroid, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
    ActivityIndicator } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Avatar } from 'react-native-elements';

    // IMPORT ICON
import { 
  AntDesign,
  FontAwesome
 } from 'react-native-vector-icons';

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
import ListUserComponent from '../../components/chat/ListUserComponent';
import ModalSearchUserComponent from '../../components/chat/ModalSearchUserComponent';

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

class UserScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'TIN NHẮN',
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.MAIN_PRIMARY 
    },
    headerStyle: { backgroundColor: COLORS.LIGHT },
    headerRight: ()=> UserScreen.openModalSearchUser(navigation)
  });

  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        users: [],
        modalSearchVisible: false
    }
  }

  componentDidMount() {
    this.getListGroupUser()

    this.chat = io(PARAMETER.SERVER);
    this.chat.on("SEND_MESSAGE_CHAT", data => {
        const { user } = this.props
        
        // Check new message
        if (
          data.group.members.includes(user._id)
        ) {
          this.getListGroupUser()
        }
    })
  }

  static openModalSearchUser = (navigation)=> (
    <TouchableOpacity
              onPress={()=> UserScreen.handleSearchUser(navigation)}
            >
                <FontAwesome style={[
                { 
                  color: COLORS.MAIN_PRIMARY,
                  paddingRight: 12
                }
              ]} size={25} name={'pencil-square-o'} />
            </TouchableOpacity>
  )

  static handleSearchUser = (navigation)=> {
    navigation.setParams({'modalSearchVisible': true})
  }

  handleModalSearchVisible = (boolean)=> {
    const { navigation } = this.props
    navigation.setParams({'modalSearchVisible': boolean})
  }

  getListGroupUser = async ()=> {
    const { user } = this.props
    try {
      let data = await chatService.getListGroupUser({user})
      this.setState(data)

    } catch (error) {
      console.log(error);
    }
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { users, loading, stopLoad } = this.state
    const { navigation } = this.props
    // return <ListUserComponent users={usersTest} navigation={navigation} />

    if (loading) {

      return <EmptyData loading={ loading } stopLoad={stopLoad} />

    } else {
      if(users.length == 0) {
        return <EmptyData loading={ loading } stopLoad={stopLoad} />
      }
     return <ListUserComponent 
              users={users}
              navigation={navigation}
              getListGroupUser={this.getListGroupUser}
            />
    }
  }
  render() {
    const { modalSearchVisible } = this.state;
    const { navigation, user } = this.props;

    return (
      <View style={{ flex:1, backgroundColor: COLORS.LIGHT }}>
        <ModalSearchUserComponent
          navigation={navigation} 
          user={user}
          modalSearchVisible={navigation.getParam('modalSearchVisible')}
          handleModalSearchVisible={this.handleModalSearchVisible}
        />
        {
          this.viewNewsOrLoader()
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(UserScreen);

const styles = StyleSheet.create({
    ViewRender: {
      flex: 1,
      padding: 10
    }
});