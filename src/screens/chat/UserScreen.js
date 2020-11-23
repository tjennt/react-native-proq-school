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

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import GLOBAL_STYLES from '../../styles/Global';

const users = [
    {
       name: 'Nguyễn Tấn Tiền'
    },
    {
        name: 'Tèo Thị Mộng Dừa'
    },
    {
        name: 'Bành Văn Bảnh'
    },{
        name: 'Ngô Văn Bắp'
    },{
        name: 'Hồ Cẩm Mai'
    },{
        name: 'Tòn A Sáo'
    },{
        name: 'Huyền Thiên Huyển'
    },{
        name: 'Hống Hành Hác'
    },{
        name: 'Lang Tà La Bằng'
    },{
        name: 'Tô Văn Vẳng'
    },
];

export default class UserScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
        stopLoad: true,
        users: []
    }
  }

  componentDidMount() {
      const { loading, stopLoad } = this.state
      setTimeout(()=> {
        this.setState({loading: false, stopLoad: true, users: users})
      }, 40)
  }

  // View load list or loader
  viewNewsOrLoader() {
    const { users, loading, stopLoad } = this.state
    const { navigation } = this.props
    if (loading) {

      return <EmptyData loading={ loading } stopLoad={stopLoad} />

    } else {

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

const styles = StyleSheet.create({
    ViewRender: {
      flex: 1,
      padding: 10
    }
});