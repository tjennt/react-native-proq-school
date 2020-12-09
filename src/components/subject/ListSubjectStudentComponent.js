import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableOpacity } from 'react-native';
  
  import { Button, 
    Text, 
    ThemeProvider, 
    ListItem, 
    Avatar, 
    SearchBar,
    Badge } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT LIBRARY
import {FontAwesome,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import GLOBAL_STYLES from '../../styles';

export default class ListSubjectStudentComponent extends Component {

    constructor (props) {
        super(props)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
        <ListItem  
            // bottomDivider
            containerStyle={ styles.ListItemSchedule }
        >
            <TouchableOpacity
                style={ { flex: 1 } }
                onPress={ ()=> { this.moreInfoSchedule(item) } } 
            >
                {/* CONTENT */}
                <ListItem.Content>
                
                {/* First content */}
                <ListItem.Content style={ styles.ContentRow }>
                    
                    <ListItem.Title style={styles.text}>
                        { this.renderIconRandom(index) }
                        <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.TextDateTime] }>
                        &nbsp;{item.subject.name}
                        </Text>
                        <Text style={ [GLOBAL_STYLES.TextTitleStyle, { fontSize: 13 }] }>  ( Ca {item.shift} )
                        </Text>
                    </ListItem.Title>
                    <Badge
                        badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                        textStyle={[GLOBAL_STYLES.ButtonStyle]}
                        value={ item.subject.searchString.toUpperCase() }
                        status="success" />
                </ListItem.Content>

                {/* Bottom content */}
                <ListItem.Content style={ styles.ContentRow }>

                {/* <ListItem.Title style={{ flex: 1 }}>2020/20/10 - 2020/20/11</ListItem.Title> */}
            
                    <ListItem.Subtitle 
                        style={{ flex: 1, fontSize: 12, marginTop: 5 }}
                    >
                        { HelperService.getDateFormat(item.startAt, 'date_time') } - { HelperService.getDateFormat(item.endAt) }
                    </ListItem.Subtitle>
                    <ListItem.Subtitle 
                        style={{ flex: 1, fontSize: 12, textAlign: 'right', marginTop: 5 }}
                    >
                        {
                            this.getBadgeWeekDays(item.weekDays)
                        }
                    </ListItem.Subtitle>
                
                </ListItem.Content>
                
            </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    )

    moreInfoSchedule = (item) => {

        this.props.navigation.navigate('StudentScheduleSubjectScreen', {
            subjectScheduleId: item._id,
            classSubject: {
                shift: item.shift
            },
            title: `LỊCH HỌC MÔN ${item.subject.name.toUpperCase()}`
        })

    }

    renderIconRandom = (index)=> {
        if (index % 2) {
            return <AntDesign style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'staro'} />
        }
        if (index % 3) {
            return <FontAwesome style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'leanpub'} />
        }

        return <FontAwesome style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'leaf'} />

    }

    getBadgeWeekDays = (weekDays)=> {
        
        return weekDays.map((day, index)=> {
            let dayString
            if (day == 0){
                dayString = 'CN'
            }else {
                dayString = ++day
            }
            
            return <Badge
            badgeStyle={{ padding: 5, marginRight: 3, backgroundColor: COLORS.BADGE_RANDOM[index] }}
            textStyle={[GLOBAL_STYLES.ButtonStyle]}
            value={ dayString }
            status="success" />
        })
        
    }

    render () {
        const { subjects } = this.props
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={subjects}
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