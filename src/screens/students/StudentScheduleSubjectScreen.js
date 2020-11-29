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

import * as COLORS from '../../constants/Colors';
import * as PARAMETER from '../../constants/Parameter';

// IMPORT DATA
import { DAYS } from '../../constants/Data';

// IMPORT GET API 
import * as apiClassSubject from '../../services/api/student/classSubject';

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
      stopLoad: true
    }
  }

  componentDidMount() {
    // const {setParams} = this.props.navigation;
    // setParams({ title: 'PHP' })
    
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

  render() {
    const { schedulesSubject } = this.state
    return (
      <View style={ {flex:1} }>
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

});