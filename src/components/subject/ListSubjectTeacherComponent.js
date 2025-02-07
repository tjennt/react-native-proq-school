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
import {Ionicons,
    MaterialIcons,
    Feather 
} from 'react-native-vector-icons';

const list = [
    {
      name: 'Lập trình PHP',
      code: 'PHP',
      date: '2020/13/10',
      nameDay: 'MO',
      studyTime: 'Ca 1',
      description: 'Bua nay vo hoc cho vui thoi'
    },
    {
      name: 'Lập trình Javascript',
      code: 'JS',
      date: '2020/13/10',
      nameDay: 'TU',
      studyTime: 'Ca 1',
      description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Kĩ năng làm việc',
        code: 'KN1023',
        date: '2020/13/10',
        nameDay: 'WE',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    },
    {
        name: 'Lập trình python',
        code: 'python1',
        date: '2020/13/10',
        nameDay: 'TH',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi'
    }
];

export default class ListSubjectTeacherComponent extends Component {

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
                        <Feather style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'book'} />    
                        <Text style={ styles.TextDateTime }>
                        &nbsp;{ item.name }
                        </Text>
                    </ListItem.Title>
                    <Badge
                        badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                        textStyle={{ fontWeight: 'bold' }}
                        value={ item.code.toUpperCase() }
                        status="success" />
                </ListItem.Content>

                {/* Bottom content */}
                <ListItem.Content style={ styles.ContentRow }>

                    <ListItem.Title style={{ flex: 1 }}>Số lớp dạy: 4</ListItem.Title>
            
                    <ListItem.Subtitle style={{ flex: 1, fontSize: 12, textAlign: 'right', marginTop: 5 }}>  </ListItem.Subtitle>
                
                </ListItem.Content>
                
            </ListItem.Content>
        </ListItem>
    )

    moreInfoSchedule = (description) => {
        alert(description)
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