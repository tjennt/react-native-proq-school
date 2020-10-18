import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    ImageBackground,
    ScrollView
  } from 'react-native';

import { 
  Avatar,
  Text,
  Badge } from 'react-native-elements';

// IMPORT IMAGE MODAL
import ImageModal from 'react-native-image-modal';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../constants/Parameter';

// IMPORT COLORS
import * as COLORS from '../constants/Colors';

// IMPORT COMPONENT
import ViewInfoStudentComponent from '../components/profile/ViewInfoStudentComponent';
import ViewInfoTeacherComponent from '../components/profile/ViewInfoTeacherComponent';


// IMPORT REDUX
import * as actions from '../actions';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  // VIEW INFO RENDER
  ViewInfo() {
    
    const { user } = this.props
    
    if (user.role === PARAMETER.STUDENT_ROLE){
      return <ViewInfoStudentComponent user={user} />
    }
    
    return <ViewInfoTeacherComponent user={user} />
    
  }

  render() {
    const { user } = this.props

    return (
      <ScrollView style={styles.container}>
        
        {/* BACKGROUND, AVATAR, FULL NAME */}
        <ImageBackground
          style={ styles.ImageBackground }
          source={ require('../assets/images/illustrators/info-student.svg') }
        >

          <Avatar
            source={ { 
              uri: require('../assets/images/demo/anh_the.jpg')
            } }
            style={ styles.Avatar }
            avatarStyle={styles.AvatarStyle}
          />

          <Text style={ styles.TextName }>{ user.fullName.toUpperCase() }</Text>

        </ImageBackground>


        {/* VIEW INFO */}
        { this.ViewInfo() }
        
      </ScrollView>
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
  }
})