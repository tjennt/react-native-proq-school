import React, { Component } from 'react';

import { 
    StyleSheet,
    SafeAreaView,
    FlatList, } from 'react-native';
  
  import {
    Text, 
    ListItem, 
    Badge } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import GLOBAL_STYLES from '../../styles';

export default class ListScheduleSubjectStudentComponent extends Component {

    constructor (props) {
        super(props)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => {
        const { classSubject } = this.props
        return (
            <ListItem 
                // bottomDivider
                containerStyle={ styles.ListItemSchedule }
            >
                {/* CONTENT */}
                <ListItem.Content>
                    
                    {/* First content */}
                    <ListItem.Content style={ styles.ContentRow }>
                        
                        <ListItem.Title style={styles.text}
                            onPress={ ()=> { this.moreInfoSchedule(item) } } 
                        >
                            <AntDesign style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'clockcircleo'} />    
                            <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.TextDateTime] }>
                            &nbsp; {HelperService.getDateName(item.date)} - {HelperService.getDateFormat(item.date)}
                            </Text>
                            <Text style={ { fontSize: 13 } }></Text>
                        </ListItem.Title>
                        {
                            this.renderBadge({
                                date: item.date,
                                status: item.status
                            })
                        }
                    </ListItem.Content>

                    {/* Bottom content */}
                    <ListItem.Content style={ styles.ContentRow }>
                        <ListItem.Subtitle 
                            onPress={ ()=> { this.moreInfoSchedule(item) } }
                            style={ [GLOBAL_STYLES.TextTitleStyle, { flex: 1, fontSize: 12, marginTop: 5 }] }
                        >
                                Giảng viên: {item.teacher.fullname}
                            
                        </ListItem.Subtitle>
                        <ListItem.Subtitle 
                            onPress={ ()=> { this.moreInfoSchedule(item) } }
                            style={  [GLOBAL_STYLES.TextTitleStyle, { flex: 1, fontSize: 12, textAlign: 'right', marginTop: 5 }] }
                        >
                            ( Ca { classSubject.shift } )
                        </ListItem.Subtitle>
                    
                    </ListItem.Content>
                    
                </ListItem.Content>
            </ListItem>
        )
    }

    renderBadge = (data)=> {
        const { date, status }  = data
        
        let dateStudy = new Date(date)
        let now = new Date()

        let badge = {value: '', status: ''}

        if(
            dateStudy.setHours(0,0,0,0) > now.setHours(0,0,0,0) ||
            dateStudy.setHours(0,0,0,0) == now.setHours(0,0,0,0) 
        ) {
            badge.value = 'Chưa học'
            badge.status = 'primary'
            if(
                status == true
            ){
                badge.value = 'Có mặt'
                badge.status = 'success'
            }
        }

        else if(
            dateStudy.setHours(0,0,0,0) < now.setHours(0,0,0,0) &&
            status == false
        ) {
            badge.value = 'Vắng mặt'
            badge.status = 'error'
        }

        else if(
            dateStudy.setHours(0,0,0,0) < now.setHours(0,0,0,0) &&
            status == true
        ){
            badge.value = 'Có mặt'
            badge.status = 'success'
        }
        

        return <Badge
            badgeStyle={{ padding: 12 }}
            textStyle={ [GLOBAL_STYLES.ButtonStyle] }
            value={ badge.value }
            status={ badge.status } 
        />
    }

    moreInfoSchedule = (item) => {

    }

    render () {
        const { schedulesSubject } = this.props;
        // console.log(this.props.navigation)
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={schedulesSubject.days}
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
    AvatarSchedule: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        borderRadius: 10
    },
    text: {
        flex: 1
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
    TextDateTime: {
        fontSize: 17,
        marginLeft: 5
    },
    ListItemSchedule: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
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
    }
});