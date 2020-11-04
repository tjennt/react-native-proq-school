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

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

import Toggle from 'react-native-toggle-element';

// Service 
import * as HelperService from '../../services/HelperService';

export default class ListClassScheduleTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
          classSchedule: [
            {
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: true
            },
            {
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: false
            },{
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: false
            },{
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: true
            },{
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: false
            },{
              name: 'Nguyễn Tấn Tiền',
              studentCode: 'PS09110',
              avatar: 'iamge/sa/sasda.jpg',
              status: false
            },
          ]
        }
    }
    
    attendance = (item, index)=> {
    
    console.log(item)
    
    // Call api

    // studentId
    // subjectId
    // dateTimeNow format new Date('11-20-2020').toISOString()

    
    console.log(HelperService.getDateNow())
        
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
                        source={ require('../../assets/images/demo/anh_the.jpg') } />
                    
                    {/* Full name and student code */}
                    <ListItem.Content style={styles.text}>

                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={ { fontSize: 12 } }>{item.studentCode}</ListItem.Subtitle>

                    </ListItem.Content>

                    <View style={styles.floatRightSwitch}>

                        <Toggle 
                            value={ item.status }
                            thumbButton={{
                                width: 35,
                                height: 35,
                                radius: 30,
                                activeBackgroundColor: COLORS.LIGHT,
                                inActiveBackgroundColor: COLORS.LIGHT
                            }}
                            trackBar={{
                                activeBackgroundColor: COLORS.MAIN_TEXT,
                                inActiveBackgroundColor: COLORS.GRAY,
                                borderActiveColor: COLORS.MAIN_PRIMARY,
                                borderInActiveColor: COLORS.MAIN_PRIMARY,
                                borderWidth: 0.4,
                                width: 60,
                                height: 35
                            }}
                            animationDuration={ 100 }
                            onPress={ () => this.attendance(item, index) }
                        />
                    
                    </View>
                </ListItem.Content>
                
            </ListItem.Content>
        </ListItem>
    )

    render () {
        const { classSchedule } = this.state;
        
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={classSchedule}
                renderItem={this.renderItem}
            />
        </SafeAreaView>
        )
    }
}

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