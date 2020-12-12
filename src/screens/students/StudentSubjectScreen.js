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
import ListTimeStudentComponent from '../../components/subject/ListTimeStudentComponent';
import ListSubjectStudentComponent from '../../components/subject/ListSubjectStudentComponent';

import * as COLORS from '../../constants/Colors';

// IMPORT DATA
import { TIME_STUDENT } from '../../constants/Data';

// IMPORT GET API 
import * as apiClassSubject from '../../services/api/student/classSubject';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

class StudentSubjectScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      seasons: [],
      subjects: [],
      selectedSeason: 0,
      loading: true,
      stopLoad: false,
      seasonId: ''
    }
  }

  componentDidMount() {
    this.getListSeasons()
  }

  // Selected button
  buttonStyleSeleted = (index) => {
    if (index == this.state.selectedSeason) {
      return styles.ButtonStyleSelected
    }
    return styles.ButtonStyle
  }

  getSubject = (seasonId, index) => {
    
    this.setState({
      selectedSeason: index,
      subjects: [],
      loading: true,
      seasonId: seasonId
    })
    this.getListSubjects(seasonId)
  }

  // Season
  getListSeasons = async ()=> {
    const { user } = this.props
    try {
      let data = await apiClassSubject.getListSeasons({ user })
      this.setState(data)
      this.getListSubjects()
    } catch (error) {
      console.error(error)
    }
  }

  // get List subjects
  getListSubjects = async (seasonId = null)=> {
    const { user } = this.props
    const { seasons } = this.state
    
    if(seasonId == null && seasons.length != 0) {
      seasonId = seasons[0]._id
      this.setState({ seasonId: seasons[0]._id })
    }
    try {
      let data = await apiClassSubject.getListSubjects({ user, seasonId })
      this.setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  viewListOrEmpty = ()=> {
    const { loading, stopLoad, subjects, seasonId } = this.state
    const { navigation } = this.props
    
    if(subjects.length == 0) {
      return <EmptyData loading={loading} stopLoad={stopLoad} />
    }
    return <ListSubjectStudentComponent
            subjects={subjects}
            navigation={ navigation }
            getListSubjects={this.getListSubjects}
            seasonId={seasonId}
          />
  }

  render() {
    const { seasons } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.LIGHT }}>
        <View style={ styles.ViewListTime }>
          <ListTimeStudentComponent 
            seasons={ seasons }
            buttonStyleSeleted={ this.buttonStyleSeleted }
            getSubject={ this.getSubject }
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

export default connect(mapStateToProps, null)(StudentSubjectScreen);

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
  ViewListTime: {
    paddingTop: 10
  }
});