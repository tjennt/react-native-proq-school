import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    StyleSheet,
    Linking,
    SafeAreaView
  } from 'react-native';

import { 
  Image
 } from 'react-native-elements';


import * as Updates from 'expo-updates';

// IMPORT COLORS
import * as COLORS from '../../src/constants/Colors';

// IMPORT LIBRARY
import {Entypo,
  AntDesign,
  MaterialIcons
} from 'react-native-vector-icons';

// IMPORT HELPER SERVICE
import { _removeData } from '../services/HelperService';

import GLOBAL_STYLES from '../styles';
import * as PARAMETER from '../constants/Parameter';
export default class MoreScreen extends Component {
  
  logout = ()=> {
    _removeData('user')
    Updates.reloadAsync()
  }
  
  navigationScreen = (screen, params = {})=> {
    this.props.navigation.navigate(screen, params);
  }

  render() {
    return (
      <SafeAreaView style={ styles.SafeAreaView }>
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
          underlayColor={ COLORS.MAIN_BG }
          onPress={()=> this.navigationScreen('UserScreen', {
            modalSearchVisible: false
          }) }
        >
          <View style={styles.ViewTagMenu}>
            <AntDesign style={[styles.IconTitle]} size={35} name={'message1'} />
            <Text style={styles.TextTitle}>Tin Nhắn</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          underlayColor={ COLORS.MAIN_BG }
          onPress={()=> {
            Linking.openURL('mailto:tienntps09110@fpt.edu.vn?subject=[PROQ SCHOOL APP] Phản hồi &body=...')
          } }
        >
          <View style={styles.ViewTagMenu}>
            <Entypo style={[styles.IconTitle]} size={35} name={'notification'} />
            <Text style={styles.TextTitle}>Gửi phản hồi - thông báo lỗi</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          underlayColor={ COLORS.MAIN_BG }
          onPress={()=> {
            Linking.openURL('tel:+84902318374')
          } }
        >
          <View style={styles.ViewTagMenu}>
            <MaterialIcons style={[styles.IconTitle]} size={35} name={'phonelink-ring'} />
            <Text style={styles.TextTitle}>Điện thoại hỗ trợ</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={ styles.TouchableHighlight }
          underlayColor={ COLORS.MAIN_BG }
          onPress={()=> {
            Linking.openURL(PARAMETER.SERVER_FE)
          } }
        >
          <View style={styles.ViewTagMenu}>
            <MaterialIcons style={[styles.IconTitle]} size={35} name={'web'} />
            <Text style={styles.TextTitle}>ProQ trên web</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ styles.TouchableHighlight }
          underlayColor={ COLORS.MAIN_BG }
          onPress={()=> this.logout() }
        >
          <View style={styles.ViewTagMenu}>
            <AntDesign style={[styles.IconTitle]} size={35} name={'logout'} />
            <Text style={styles.TextTitle}>Đăng xuất</Text>
            <Text style={styles.TextNext}>{'>'}</Text>
          </View>
        </TouchableHighlight>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5
  },
  ViewTagMenu: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.LIGHT,
    // borderRadius: 20,
    borderBottomRightRadius: 45,
    borderTopRightRadius: 20,
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
    ...GLOBAL_STYLES.TextTitleStyle
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
    marginRight: 10,
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
    paddingTop: 5, 
    paddingBottom: 5, 
    textAlign: 'center',
    ...GLOBAL_STYLES.TextTitleStyle
  },
  ImageCopyRight: { 
    width: 100,
    height: 100
  }
})