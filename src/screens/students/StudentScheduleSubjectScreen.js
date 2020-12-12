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
import ListScheduleSubjectStudentComponent from '../../components/subject/ListScheduleSubjectStudentComponent';
import ListDaysComponent from '../../components/schedule/ListDaysComponent';

import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

// IMPORT DATA
import { DAYS } from '../../constants/Data';

// IMPORT GET API 
import * as apiClassSubject from '../../services/api/student/classSubject';
import { SearchSubjectSchedule } from '../../services/teacher/subject-schedule/SearchSubjectSchedule';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

import GLOBAL_STYLES from '../../styles';

class StudentScheduleSubjectScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('title')}`,
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.MAIN_PRIMARY
    },
    headerStyle: { backgroundColor: COLORS.LIGHT },
  })
  
  constructor(props) {
    super(props)
    this.state = {
      schedulesSubject: [],
      loading: true, 
      stopLoad: true,
      daysRange: []
    }
  }

  componentDidMount() {
    
    this.getDateRange()
    this.getListSchedules()
  }

  getListSchedules = async ()=> {
    const { navigation, user } = this.props
    let subjectScheduleId = navigation.getParam('subjectScheduleId')
    try {
      let data = await apiClassSubject.getListScheduleDetail({ user, subjectScheduleId })
      // console.log(data);
      this.setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  viewListOrEmpty = ()=> {
    const { loading, stopLoad, schedulesSubject } = this.state
    const { navigation } = this.props
    let classSubject = navigation.getParam('classSubject')
    if(schedulesSubject.length == 0) {
      return <EmptyData loading={loading} stopLoad={stopLoad} />
    }
    return <ListScheduleSubjectStudentComponent
            classSubject={classSubject}
            schedulesSubject={schedulesSubject}
          />
  }
  
  // Get date range
  getDateRange = async ()=> {
    const { navigation } = this.props
    const data = navigation.getParam('classSubject')
    try {
      let weekDays = await SearchSubjectSchedule.getDateRangeClassSubject(data.weekDays)
      delete weekDays[0]
      this.setState({
        daysRange: weekDays
      })
    } catch (e) {
      console.log(e); 
    }
  }
  
  // Selected button
  buttonStyleSeleted = (index) => {
    return styles.ButtonStyle
  }

  getScheduleDays = (day, index) => {

  }

  render() {
    const { daysRange } = this.state
    return (
      <View style={ {flex:1} }>
        <View style={{ marginTop: 10 }}>
          <ListDaysComponent 
            days={ daysRange }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          />
        </View>
        {
          this.viewListOrEmpty()
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(StudentScheduleSubjectScreen);

const styles = StyleSheet.create({
  ButtonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#4fc3f7'
  }
});