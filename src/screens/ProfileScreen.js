import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    ImageBackground
  } from 'react-native';

import { Image,
    Avatar,
    Accessory,
    Text,
    SocialIcon,
    Card } from 'react-native-elements';

// IMPORT IMAGE MODAL
import ImageModal from 'react-native-image-modal';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../constants/Parameter';

// IMPORT COLORS
import * as COLORS from '../constants/Colors';

// IMPORT ICON
import { 
  Feather,
  Fontisto,
  MaterialCommunityIcons
 } from 'react-native-vector-icons';

// IMPORT REDUX
import * as actions from '../actions';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {

  }

  render() {
    const { user } = this.props

    return (
      <View style={styles.container}>
        
        {/* BACKGROUND, AVATAR, FULL NAME */}
        <ImageBackground
          style={ styles.ImageBackground }
          source={ require('../assets/images/illustrators/info-student.svg') }
        >
          {/* <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#000000"
          style={{
            width: 250,
            height: 250,
          }}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2019/07/25/18/58/church-4363258_960_720.jpg',
          }}
        /> */}
        
          <Avatar
            source={ { 
              uri: require('../assets/images/demo/anh_the.jpg')
            } }
            style={ styles.Avatar }
            avatarStyle={styles.AvatarStyle}
          />
          <Text style={ styles.TextName }>{ user.fullName.toUpperCase() }</Text>
        </ImageBackground>

        {/*  */}
        <View style={ styles.ViewAllInfo }>
          <View style={ styles.ViewInfo }>
              
              <View style={ styles.ViewIcon }>
                <Text style={ { textAlign: 'center' } }>
                  <Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />
                </Text>
              </View>

              <View style={ styles.ViewContentInfo }>
              
                <View style={ styles.TextTitle }>
                  <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Mã số sinh viên</Text>
                </View>
                
                <Text style={{ flex: 1, fontSize: 16, color: COLORS.MAIN_LIGHT }}>{ user.studentCode.toUpperCase() }</Text>
              
              </View>

          </View>

          <View style={ styles.ViewInfo }>
              
              <View style={ styles.ViewIcon }>
                <Text style={ { textAlign: 'center' } }>
                  <Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />
                </Text>
              </View>

              <View style={ styles.ViewContentInfo }>
              
                <View style={ styles.TextTitle }>
                  <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Địa chỉ email</Text>
                </View>
                
                <Text style={{ flex: 1, fontSize: 16, color: COLORS.MAIN_LIGHT }}>{ user.email }</Text>
              
              </View>

          </View>

          <View style={ styles.ViewInfo }>
              
              <View style={ styles.ViewIcon }>
                <Text style={ { textAlign: 'center' } }>
                  <MaterialCommunityIcons style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'door-open'} />
                </Text>
              </View>

              <View style={ styles.ViewContentInfo }>
              
                <View style={ styles.TextTitle }>
                  <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Tên lớp học</Text>
                </View>
                
                <Text style={{ flex: 1, fontSize: 16, color: COLORS.MAIN_LIGHT }}>{ user.className.toUpperCase() }</Text>
              
              </View>

          </View>

        </View>
        
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  ImageBackground: {
    height: 220,
    marginBottom: 70
  },
  Avatar: {
    position: 'absolute',
    left: 30,
    bottom: -55,
    width: 110,
    height: 110,
  },
  AvatarStyle: {
    resizeMode : 'cover',
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: COLORS.LIGHT
  },
  TextName: {
    position: 'absolute',
    left: 145,
    bottom: -35,
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold'
  },
  ViewAllInfo: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ViewInfo: {
    flexDirection: "row",
    marginTop: 20,
    width: '100%',
    height: 100,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ViewIcon: {
    flex: 0.2,
    justifyContent: 'center'
  },
  ViewContentInfo: {
    flex: 0.8,
    justifyContent: 'center'
  },
  TextTitle: {
    flex: 1, 
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  }
})