import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity
  } from 'react-native';

import STYLE_GOBAL from '../styles/Global';

// IMPORT REDUX
import * as actions from '../actions';
import { connect } from 'react-redux';

import * as Updates from 'expo-updates';

class MoreScreen extends React.Component {
  
  logout = ()=> {
    const { navigation, deleteUser } = this.props
    deleteUser()
    Updates.reloadAsync()
  }
  
  render() {
    console.log(this.props.navigation)
    return (
      <View style={STYLE_GOBAL.container}>
        <Text>More Screen</Text>
        <TouchableOpacity onPress={()=> this.logout() }>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, actions)(MoreScreen);