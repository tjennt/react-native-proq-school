import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView
  } from 'react-native';

import {
  Text } from 'react-native-elements';
// IMPORT PARAMETER
import * as PARAMETER from '../constants/Parameter';
// IMPORT COMPONENT
import ViewInfoStudentComponent from '../components/profile/ViewInfoStudentComponent';
import ViewInfoTeacherComponent from '../components/profile/ViewInfoTeacherComponent';


// IMPORT REDUX
import { connect } from 'react-redux';
class ProfileScreen extends Component {
  
  constructor(props) {
    super(props)
  }

  // VIEW INFO RENDER
  ViewInfo() {
    const { user } = this.props
    
    if (user.role === PARAMETER.STUDENT_ROLE){
      return <ViewInfoStudentComponent />
    }
    
    return <ViewInfoTeacherComponent />
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>

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
  }
})