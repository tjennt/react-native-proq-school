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
    SearchBar, 
    ThemeConsumer} from 'react-native-elements';

import STYLE_GOBAL from '../../styles/Global';

// IMPORT COMPONENTS
import ListDaysComponent from '../../components/schedule/ListDaysComponent';
import ListScheduleTeacherComponent from '../../components/schedule/ListScheduleTeacherComponent';

import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

// IMPORT DATA
// import { DAYS } from '../../constants/Data';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT HELPER SERVICE
import * as HelperService from '../../services/HelperService';
import { SearchSubjectSchedule } from '../../services/teacher/subject-schedule/SearchSubjectSchedule';

import GLOBAL_STYLES from '../../styles';

export default class TeacherSubjectScheduleScreen extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: `MÔN ${navigation.getParam('data').subject.name.toUpperCase()} - LỚP ${navigation.getParam('data').class.name}`,
    headerTitleAlign: 'left',
    headerTitleStyle: { 
      fontFamily: PARAMETER.FONT_BOLD_MAIN,
      color: COLORS.LIGHT 
    },
    headerStyle: { backgroundColor: COLORS.MAIN_PRIMARY }
  })

  constructor(props) {
    super(props)
    this.state = {
      daysRange: [],
      listDays: [],
      rawData: {},
      data: {
        idClassSubject: '',
        listDays: [],
        shift: {},
        class: {},
        subject: {},
        weekDays: []
      },
      selectedDay: 0,
      loading: true
    }
  }

  componentDidMount() {
    
    this.getDateRange()
    this.getData()

  }

  getData = async ()=> {
    const { navigation } = this.props
    
    await this.setState({
      rawData: navigation.getParam('data'),
      listDays: navigation.getParam('data').listDays
    })

    await this.getScheduleDays({id: 7, label: 'Tất cả', checkAll: true }, 0)
  }
  // Get date range
  getDateRange = ()=> {
    const { navigation } = this.props
    const data = navigation.getParam('data')
    this.setState({
      daysRange: SearchSubjectSchedule.getDateRangeClassSubject(data.weekDays)
    })
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedDay) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  // Get schedule
  getScheduleDays = (day, index) => {
    const { rawData, listDays } = this.state
    const { navigation } = this.props
    
    this.setState({
      data: rawData,
      selectedDay: index,
    })

    return
    console.log(day);
    let data = rawData
    data.listDays = SearchSubjectSchedule.getListSubjectScheduleSortDay(listDays, day)
    // Selected day
    console.log(data, listDays);
    // return
    this.setState({
      selectedDay: index,
      data: data
    })
  }

  setLoading = ()=> {
    this.setState({ loading: false })
  }

  viewListScheduleOrEmptyData = ()=> {
    const { navigation } = this.props
    const { data, loading, stopLoad } = this.state
    if (data.listDays.length == 0) {
      return <EmptyData />
    }

    return <ListScheduleTeacherComponent
        data={data}
        navigation={navigation}
        screenName='TeacherSubjectScheduleClassScreen'
        setLoading={ this.setLoading }
      />
  }

  render() {
    const { navigation } = this.props
    const { daysRange, loading } = this.state
    return (
      <View style={{ backgroundColor: COLORS.LIGHT, flex: 1 }}>
        {/* <View style={ styles.ViewListDays }>
          <ListDaysComponent 
            days={ daysRange }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getScheduleDays={ this.getScheduleDays }
          />
        </View> */}
        {/* <EmptyData loading={loading} stopLoad={!loading} /> */}
        { this.viewListScheduleOrEmptyData() }
      </View>
    )
  }
}

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