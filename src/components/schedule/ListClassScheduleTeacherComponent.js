import React, { Component } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    FlatList, 
    Switch,
    Button,
    View} from 'react-native';
  
  import { 
    ListItem, 
    Avatar} from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

import Toggle from 'react-native-toggle-element';

// Service 
import * as HelperService from '../../services/HelperService';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ListClassScheduleTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
          classSchedule: []
        }
    }

    componentDidMount() {
        return this.getListStudentScheduleClassDay()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
        <ListItem 
            // bottomDivider
            containerStyle={ styles.ListItemSchedule }
        >
            {/* CONTENT */}
            <ListItem.Content>
                
                {/* First content */}
                <ListItem.Content style={ styles.ContentRow }>
                    
                    {/* Avatar student */}
                    <Avatar
                        rounded={true}
                        style={ styles.Avatar }
                        avatarStyle={ styles.AvatarStyle }
                        source={ {
                            uri: `${PARAMETER.SERVER}/${item.student.avatar}`
                        } } />
                    
                    {/* Full name and student code */}
                    <ListItem.Content style={styles.text}>

                        <ListItem.Title>{ item.student.fullName }</ListItem.Title>
                        <ListItem.Subtitle style={ { fontSize: 12 } }>{ item.student._id }</ListItem.Subtitle>

                    </ListItem.Content>

                    <View style={styles.floatRightSwitch}>

                        <Toggle 
                            value={ item.status }
                            thumbButton={{
                                width: 30,
                                height: 30,
                                activeBackgroundColor: COLORS.LIGHT,
                                inActiveBackgroundColor: COLORS.LIGHT
                            }}
                            trackBar={{
                                activeBackgroundColor: COLORS.MAIN_TEXT,
                                inActiveBackgroundColor: COLORS.GRAY,
                                borderActiveColor: COLORS.MAIN_PRIMARY,
                                borderInActiveColor: COLORS.MAIN_PRIMARY,
                                borderWidth: 0.4,
                                width: 50,
                                height: 30
                            }}
                            animationDuration={ 100 }
                            onPress={ () => this.attendance(item, index) }
                        />
                    
                    </View>
                </ListItem.Content>
                
            </ListItem.Content>
        </ListItem>
    )

    // Axios get list student
    getListStudentScheduleClassDay = async ()=> {
        const { classSubject, user } = this.props
        try {
            let res = await axios.get(
                `${PARAMETER.SERVER}/v1/teacher/schedules/${classSubject.idClassSubject}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                params: {
                    date: classSubject.day
                }
            })

            let { data } = res

            if (data.success == true) {
                console.log(data.payload)
                this.setState({
                    classSchedule: data.payload
                })
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }
    
    // Axios attentdance
    attendance = async (item, index)=> {
        const { classSubject, user } = this.props
        
        try {
            let res = await axios.post(
                `${PARAMETER.SERVER}/v1/teacher/schedules/`, 
            {
                schedulesClass: classSubject.idClassSubject,
                status: true,
                student: item.student._id,
                date: HelperService.getDateFormat(item.date, 'month_day_year')
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            let { data } = res
            
            if (data.success == true) {
                console.log(data)
            }
        } catch (e) {
            console.log("ERROR", e)
        }
        
            
    }
    
    // View render
    viewRenderListOrEmpty = ()=> {
        const { classSchedule } = this.state
        if (classSchedule.length == 0) {
            return <EmptyData />
        }

        return <FlatList
            keyExtractor={this.keyExtractor}
            data={classSchedule}
            renderItem={this.renderItem}
        />
    }
    render () {
        const { classSchedule } = this.state;
        
        return (
        <SafeAreaView style={styles.container}>
            { this.viewRenderListOrEmpty() }
        </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ListClassScheduleTeacherComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    Avatar: {
        width: 70,
        height: 70
    },
    AvatarStyle: {
        resizeMode : 'cover',
        borderRadius: 55,
        borderWidth: 2,
        borderColor: COLORS.LIGHT
    },
    text: {
        paddingTop: 15,
        paddingLeft: 10
    },
    studyTime: {
        fontSize: 12,
        textAlign: 'center', 
        paddingTop: 2
    },
    ContentRow: {
        flexDirection: "row",
        width: '100%'
    },
    ContentRowBottom: {
        flexDirection: "row",
        width: '100%',
        marginTop: 10
    },
    TextDateTime: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 5
    },
    ListItemSchedule: {
        marginTop: 5,
        marginBottom: 5,
        // backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5
    },
    floatRightSwitch: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 18
    },
});