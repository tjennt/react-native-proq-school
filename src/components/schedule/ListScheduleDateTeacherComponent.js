import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    TouchableOpacity,
    SafeAreaView,
    FlatList,} from 'react-native';
  
  import { BottomSheet, 
    Text,
    ListItem,
    Badge } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT LIBRARY
import {Ionicons,
    FontAwesome,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT Service
import * as HelperService from '../../services/HelperService';

import * as apiSchedule from '../../services/api/schedule';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../Helpers/EmptyData';
import axios from 'axios';

import GLOBAL_STYLES from '../../styles';

export default class ListScheduleDateTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        const { day } = this.props
        return (
            <ListItem containerStyle={ styles.ListItemSchedule }>
                <TouchableOpacity
                    style={ { flex: 1 } }
                    onPress={ ()=> { this.navigateSchedule(item, day) } } 
                >
                    {/* CONTENT */}
                    <ListItem.Content>
                        
                        {/* First content */}
                        <ListItem.Content style={ styles.ContentRow }>
                            
                            <ListItem.Title style={styles.text}>
                                {
                                    this.renderIconRandom(index)
                                }    
                                <Text style={ [ GLOBAL_STYLES.TextTitleStyle, styles.TextDateTime] }>
                                    &nbsp; { day.label } - 
                                    (Ca { item.shift })
                                </Text>
                            </ListItem.Title>

                            <ListItem.Subtitle style={[GLOBAL_STYLES.TextStyle, styles.SubTitleDate]}>
                                { day.value } 
                            </ListItem.Subtitle>
                        
                        </ListItem.Content>

                        {/* Bottom content */}
                        <ListItem.Content style={ styles.ContentRowBottom }>

                            <ListItem.Title style={ [GLOBAL_STYLES.TextStyle, { flex: 1 }] }>
                                { item.subject.name.toUpperCase() } - { 'Tìm hiểu về biến v...' }
                            </ListItem.Title>
                    
                            <Badge
                                badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                                textStyle={ [GLOBAL_STYLES.TextTitleStyle, { fontWeight: 'bold' }] }
                                value={ item.class.name.toUpperCase() }
                                status="success" />

                        </ListItem.Content>
                        
                    </ListItem.Content>
                </TouchableOpacity>
            </ListItem>
        )
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

    navigateSchedule = (item, day) => {
        
        this.props.navigation.push( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen', {
            classSubject: {
                idClassSubject: item._id,
                day: day.value
            }
        })

    }

    render () {
        const { navigation, listDays } = this.props
        
        return (
            <SafeAreaView 
                style={styles.container}>
                
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={listDays}
                    renderItem={this.renderItem}
                />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 65,
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
    ContentRowBottom: {
        flexDirection: "row",
        width: '100%',
        marginTop: 10
    },
    TextDateTime: {
        fontSize: 16,
        marginLeft: 5
    },
    ListItemSchedule: { 
        // backgroundColor: '#cccccc',
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
    },
    ListItemTitleNameClass: {
        fontWeight: 'bold'
    },
    SubTitleDate: { 
        flex: 1,
        fontSize: 13,
        textAlign: 'right',
        marginTop: 5
    }
});