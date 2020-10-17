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
    AntDesign 
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

export default class ListScheduleComponent extends Component {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem 
            bottomDivider
            style={{ marginBottom: 10 }}
            onPress={ ()=> { this.moreInfoSchedule(item.description) } } 
        >
            {/* CONTENT */}
            <ListItem.Content>
                
                {/* First content */}
                <ListItem.Content style={ styles.ContentRow }>
                    
                    <ListItem.Title style={styles.text}>
                        <AntDesign style={[{color: COLORS.DARK, fontWeight: 'bold'}]} size={16} name={'clockcircleo'} />    
                        <Text style={ styles.TextDateTime }>
                        {item.date}
                        </Text>
                        <Text style={ { marginLeft: 5, fontSize: 13 } }>( Thứ 2 - Ca 1)</Text>
                    </ListItem.Title>
                    <Badge
                        badgeStyle={{ padding: 12 }}
                        textStyle={{ fontWeight: 'bold' }}
                        value={ item.code.toUpperCase() }
                        status="success" />
                </ListItem.Content>

                {/* Bottom content */}
                <ListItem.Content style={ styles.ContentRow }>

                    <ListItem.Title style={{ flex: 1 }}>{item.name}</ListItem.Title>
            
                    <ListItem.Subtitle style={{ flex: 1, textAlign: 'right' }}>7:30 - 9:30 </ListItem.Subtitle>
                
                </ListItem.Content>
                
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
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        borderRadius: 10
    },
    text: {
        flex: 1
        // transform: [{ rotate: '40deg' }]
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
    }
});