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
    SearchBar } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

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
];

export default class ListScheduleComponent extends Component {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem 
            bottomDivider
            onPress={ ()=> { this.moreInfoSchedule(item.description) } } 
        >
            <View style={ styles.AvatarSchedule }>
                <Text style={styles.text}>{ item.nameDay }</Text>
            </View>

            {/* CONTENT */}
            <ListItem.Content>
            
                <ListItem.Title>{item.name} ( { item.code } )</ListItem.Title>
            
                <ListItem.Subtitle> { item.studyTime } - {item.date} </ListItem.Subtitle>
            
            </ListItem.Content>
        </ListItem>
    )

    moreInfoSchedule = (description) => {
        alert(description)
    }

    render () {
        const { schedules } = this.props;
        
        let heightScroll = 'unset';

        if (PARAMETER.HEIGHT_SCROLL != 0) {
          heightScroll = PARAMETER.HEIGHT_SCROLL;
        }

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
        marginTop: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    AvatarSchedule: {
        width: 70,
        height: 70,
        backgroundColor: '#ccc',
        borderRightColor: '#000'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: COLORS.MAIN_TEXT
    },
    studyTime: {
        fontSize: 12,
        textAlign: 'center', 
        paddingTop: 2
    }
});