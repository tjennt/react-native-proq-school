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
import ListUserComponent from '../../components/chat/ListUserComponent';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT AXIOS SERVICE
import * as chatService from '../../services/api/chat/chatService';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import GLOBAL_STYLES from '../../styles/Global';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

class UserScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'DANH SÁCH THÀNH VIÊN',
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.LIGHT 
    },
    headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
  });

  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        users: []
    }
  }

  componentDidMount() {
      // const { loading, stopLoad } = this.state
      this.getListGroupUser()
  }

  getListGroupUser = async ()=> {
    const { user } = this.props
    console.log(user);
    try {
      let data = await chatService.getListGroupUser({user})
      this.setState(data)
      console.log(data);

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
     return <ListUserComponent users={users} navigation={navigation} />
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