import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    ScrollView
  } from 'react-native';

import { Image } from 'react-native-elements';

import STYLE_GOBAL from '../styles/Global';

// IMPORT REDUX
import * as actions from '../actions';
import { connect } from 'react-redux';

import * as Updates from 'expo-updates';

// IMPORT COLORS
import * as COLORS from '../../src/constants/Colors';

// IMPORT LIBRARY
import {Entypo,
  Feather,
  AntDesign 
} from 'react-native-vector-icons';

class MoreScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'MENU',
    headerTitleAlign: 'left',
    headerTitleStyle: { color: COLORS.LIGHT, fontWeight: 'bold' },
    headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
  })

  logout = ()=> {
    const { navigation, deleteUser } = this.props
    deleteUser()
    Updates.reloadAsync()
  }
  
  render() {
    return (
      <ScrollView style={ styles.ScrollView }>
        <View style={ styles.ViewImage }>
          <Image
            source={ require('../assets/images/illustrators/logo.png') }
            style={ styles.ImageCopyRight }
          />
          <Text style={ styles.TextCopyRight }>{ 'Copyright © PROQ'.toUpperCase() }</Text>
        </View>


        {/* Menu */}
        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          onPress={()=> console.log('Chat') }
        >
          <View style={styles.ViewTagMenu}>
            <AntDesign style={[styles.IconTitle]} size={35} name={'message1'} />
            <Text style={styles.TextTitle}>Tin Nhắn</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={ styles.TouchableHighlight }
          onPress={()=> console.log('Chat') }
        >
          <View style={styles.ViewTagMenu}>
            <Feather style={[styles.IconTitle]} size={35} name={'users'} />
            <Text style={styles.TextTitle}>Danh sách online</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          onPress={()=> console.log('Chat') }
        >
          <View style={styles.ViewTagMenu}>
            <Entypo style={[styles.IconTitle]} size={35} name={'notification'} />
            <Text style={styles.TextTitle}>Gửi phản hồi - thông báo lỗi</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          onPress={()=> console.log('Setting') }
        >
          <View style={styles.ViewTagMenu}>
            <AntDesign style={[styles.IconTitle]} size={35} name={'setting'} />
            <Text style={styles.TextTitle}>Cài đặt</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          onPress={()=> this.logout() }
        >
          <View style={styles.ViewTagMenu}>
            <AntDesign style={[styles.IconTitle]} size={35} name={'logout'} />
            <Text style={styles.TextTitle}>Đăng xuất</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, actions)(MoreScreen);

const styles = StyleSheet.create({
  ScrollView: {
    padding: 10
  },
  ViewTagMenu: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  TextTitle: {
    flex: 0.8,
    color: COLORS.DARK,
    paddingTop: 5,
    fontSize: 17,
    fontWeight: 'bold'
  },
  IconTitle: {
    color: COLORS.MAIN_TEXT,
    fontWeight: 'bold',
    flex: 0.2
  },
  TouchableHighlight: {
    width: '100%',
    marginBottom: 10
  },
  TextNext: {
    paddingTop: 5,
    fontSize: 17,
    textAlign: 'right',
    color: COLORS.GRAY
  },
  ViewImage: {  
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextCopyRight: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingTop: 5, 
    paddingBottom: 5, 
    textAlign: 'center'
  },
  ImageCopyRight: { 
    width: 100,
    height: 100
  }
})