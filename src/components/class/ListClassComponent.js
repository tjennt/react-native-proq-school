import React, { Component } from 'react';

import { View, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    StatusBar,
    SafeAreaView,
    FlatList,
    ImageBackground } from 'react-native';
  
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
import {MaterialCommunityIcons,
    MaterialIcons,
    Fontisto 
} from 'react-native-vector-icons';

const list = [
    {
        id: 1,
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'WD14304',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'WD143241',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'SD12421',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'SLF41241',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 5',
        className: 'GL341',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'WD14301',
        roomName: 'P401'    
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        dateStart: '13/10',
        dateEnd: '13/12/2020',
        studyTime: 'Ca 1',
        className: 'WD14301',
        roomName: 'P401'    
    }
];

export default class ListClassComponent extends Component {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem 
            // bottomDivider
            containerStyle={ styles.ListItemSchedule }
            onPress={ ()=> { this.moreInfoSchedule(item.description) } } 
        >
            {/* CONTENT */}
            <ListItem.Content>
                
                {/* First content */}
                <ListItem.Content style={ styles.ContentRow }>
                    
                    <ListItem.Title style={styles.text}>
                        <MaterialCommunityIcons style={[{color: COLORS.DARK, fontWeight: 'bold'}]} size={16} name={'bookmark-outline'} />    
                        <Text style={ styles.TextDateTime }>
                        &nbsp;{ item.name }
                        </Text>
                    </ListItem.Title>
                    <Badge
                        badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                        textStyle={{ fontWeight: 'bold' }}
                        value={ item.className.toUpperCase() }
                        status="success" />
                </ListItem.Content>

                {/* Bottom content */}
                <ListItem.Content style={ styles.ContentRow }>

                    <ListItem.Title style={{ flex: 0.6, fontSize: 13 }}>
                    { item.dateStart } - { item.dateEnd } ( { item.studyTime } )
                    </ListItem.Title>
            
                    <ListItem.Subtitle style={{ flex: 0.4, fontSize: 12, textAlign: 'right', marginTop: 5 }}>
                        Room: { item.roomName.toUpperCase() }
                    </ListItem.Subtitle>
                
                </ListItem.Content>
                
            </ListItem.Content>
        </ListItem>
    )

    moreInfoSchedule = (description) => {
        this.props.navigation.push('TeacherSubjectScheduleScreen',{
            subjectCode: 'PHP',
            classCode: 'WD14301'
        })
    }

    render () {
        const { schedules } = this.props;

        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={list}
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
        fontWeight: 'bold',
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