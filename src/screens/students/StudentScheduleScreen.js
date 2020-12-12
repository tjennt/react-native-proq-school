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
import ListScheduleStudentComponent from '../../components/schedule/ListScheduleStudentComponent';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import * as COLORS from '../../constants/Colors';

import * as apiSchedule from '../../services/api/student/schedule';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

class StudentScheduleScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      days: [],
      selectedDay: 0,
      day: {},
      listSchedules: [],
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
        let data = await apiSchedule.getListSchedule({user, day})
        console.log(data);
        this.setState(data)
    } catch (error) {
        console.log(error)
        this.setState({ loading: false, stopLoad: false })
    }

  }

  renderListOrEmpty() {
    const { day, listSchedules, loading, stopLoad } = this.state
    const { navigation } = this.props

    if(listSchedules.length == 0) {
      return <EmptyData loading={loading} stopLoad={stopLoad} />
    }

    return <ListScheduleStudentComponent 
            listSchedules={listSchedules}
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

export default connect(mapStateToProps, null)(StudentScheduleScreen);

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