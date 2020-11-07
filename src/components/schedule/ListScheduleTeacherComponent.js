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

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';



export default class ListScheduleTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSheet: {},
            isVisible: false,
            sheetList: [
                {
                    id: 1,
                    name: 'Điểm danh',
                    style: {},
                    onPress: ()=> {
                        this.setState({ isVisible: false })
                        this.props.navigation.push( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen', {
                            dayStudy: this.state.dataSheet
                        })
                     }
                },
                {
                    id: 2,
                    name: 'Xem danh sách lớp',
                    style: {}
                },
                {
                    id: 3,
                    name: 'Xem điểm',
                    style: {}
                },
                {
                    id: 4,
                    name: 'Hủy bỏ',
                    containerStyle: { backgroundColor: '#b71c1c' },
                    style: { color: '#fff' },
                    onPress: ()=> { this.setState({ isVisible: false }) }
                },
            ]
        }
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem containerStyle={ styles.ListItemSchedule }>
            <TouchableOpacity
                style={ { flex: 1 } }
                onPress={ ()=> { this.chooseBottomSheet(item) } } 
            >
                {/* CONTENT */}
                <ListItem.Content>
                    
                    {/* First content */}
                    <ListItem.Content style={ styles.ContentRow }>
                        
                        <ListItem.Title style={styles.text}>
                            <AntDesign style={[{color: COLORS.DARK, fontWeight: 'bold'}]} size={16} name={'clockcircleo'} />    
                            <Text style={ styles.TextDateTime }>
                                &nbsp;{ item.nameDay } - { item.studyTime } 
                            </Text>
                        </ListItem.Title>

                        <ListItem.Subtitle style={{ flex: 1, fontSize: 13, textAlign: 'right', marginTop: 5 }}> { item.date } </ListItem.Subtitle>
                    
                    </ListItem.Content>

                    {/* Bottom content */}
                    <ListItem.Content style={ styles.ContentRowBottom }>

                        <ListItem.Title style={{ flex: 1 }}>{ item.code.toUpperCase() } - { item.name.toLowerCase() }</ListItem.Title>
                
                        <Badge
                            badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                            textStyle={{ fontWeight: 'bold' }}
                            value={ item.nameClass.toUpperCase() + ' - ' + item.roomCode.toUpperCase() }
                            status="success" />

                    </ListItem.Content>
                    
                </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    )

    chooseBottomSheet = (item)=> {
        this.setState({
            dataSheet: {
                ...item
            },
            isVisible: true
        })
    }

    navigateSchedule = () => {
        const { dataSheet } = this.state

        this.props.navigation.push( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen')
    }

    render () {
        const { schedules } = this.props;
        const { isVisible, sheetList, dataSheet } = this.state
        
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={schedules}
                renderItem={this.renderItem}
            />

            {/* BOTTOM SHEET CHOOSE */}
            <BottomSheet
                isVisible={isVisible}
                containerStyle={ {
                    borderRadius: 10
                } }
            >
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={ styles.ListItemTitleNameClass }>
                            { dataSheet.nameClass }
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                {sheetList.map((sheet, key) => (
                    <ListItem key={key} containerStyle={ sheet.containerStyle } onPress={sheet.onPress}>
                    <ListItem.Content>
                        <ListItem.Title style={ sheet.style }>{sheet.name}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>

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
    }
});