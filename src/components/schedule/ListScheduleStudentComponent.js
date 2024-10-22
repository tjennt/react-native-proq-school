import React, { Component } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity } from 'react-native';
  
  import {
    Text, 
    ListItem, 
    Badge } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT LIBRARY
import {Ionicons,
    FontAwesome,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import GLOBAL_STYLES from '../../styles';

export default class ListScheduleStudentComponent extends Component {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        const { day } = this.props
        return (
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
                            </ListItem.Title>
                            <Badge
                                badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                                textStyle={ [GLOBAL_STYLES.TextTitleStyle] }
                                value={ item.subject.searchString.toUpperCase() }
                                status="success" />
                        </ListItem.Content>

                        {/* Bottom content */}
                        <ListItem.Content style={ styles.ContentRow }>

                            <ListItem.Subtitle style={ [GLOBAL_STYLES.TextTitleStyle, { flex: 1, fontSize: 12, marginTop: 5 }] }>
                                Giảng viên: {item.teacher.fullname}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={ [GLOBAL_STYLES.TextTitleStyle, { flex: 1, fontSize: 12, textAlign: 'right', marginTop: 5 }] }>
                            { HelperService.getDateFormat(day.date_format)} - ( Ca {item.shift} )
                            </ListItem.Subtitle>
                        
                        </ListItem.Content>
                        
                    </ListItem.Content>
                </TouchableOpacity>
            </ListItem>
        )
    }

    moreInfoSchedule = (description) => {
        alert('THONG TIN')
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

    render () {
        const { listSchedules } = this.props;
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={listSchedules}
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
    }
});