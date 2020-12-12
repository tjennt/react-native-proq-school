import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView
  } from 'react-native';

import { Button, 
    Text, 
    ThemeProvider, 
    ListItem, 
    Avatar, 
    SearchBar } from 'react-native-elements';

import STYLE_GOBAL from '../../styles/Global';

// IMPORT COMPONENTS
import ListDaysComponent from '../../components/schedule/ListDaysComponent';
import ListScheduleDateTeacherComponent from '../../components/schedule/ListScheduleDateTeacherComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import * as apiSchedule from '../../services/api/schedule';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import axios from 'axios';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

class TeacherScheduleScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      days: [],
      selectedDay: 0,
      day: {},
      listDays: [],
      dateNow: '',
      dataSheet: {},
      isVisible: false,
      loading: true,
      stopLoad: true
    }
  }

  async componentDidMount() {
    let listDays = await HelperService.getDateNowToWeekend()
      
    await this.setState({
      days: listDays,
      day: listDays[0]
    })
    this.getListSchedule()
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedDay) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  getScheduleDays = async (day, index) => {
    
    // Selected day
    await this.setState({
      selectedDay: index,
      day: day,
      loading: true,
      stopLoad: true
    })
    this.getListSchedule()
  }

  getListSchedule = async ()=> {
        
    const { user } = this.props
    const { day } = this.state

    try {
        let data = await apiSchedule.getListScheduleApi({user, day})
        this.setState(data)
    } catch (error) {
        console.log(error)
        this.setState({ loading: false, stopLoad: false })
    }

  }

  renderListOrEmpty() {
    const { day, listDays, loading, stopLoad } = this.state
    const { navigation } = this.props

    if(listDays.length == 0) {
      return <EmptyData loading={loading} stopLoad={stopLoad} />
    }

    return <ListScheduleDateTeacherComponent 
            listDays={listDays}
            day={day}
            navigation={navigation}
            getListSchedule={this.getListSchedule}
          />

  }
  render() {
    const { days } = this.state
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        <View style={ styles.ViewListDays }>
          <ListDaysComponent 
            days={ days }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          />
        </View>
        {
          this.renderListOrEmpty()
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(TeacherScheduleScreen);

const styles = StyleSheet.create({
  ButtonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#cccccc'
  },
  ButtonStyleSelected: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: COLORS.MAIN_TEXT
  },
  ViewListDays: {
    paddingTop: 10
  }
});