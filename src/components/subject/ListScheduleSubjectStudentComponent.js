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
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'future'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'future'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'future'
    },
    {
      name: 'Lập trình PHP',
      code: 'PHP',
      date: '2020/13/10',
      nameDay: 'MO',
      studyTime: 'Ca 1',
      description: 'Bua nay vo hoc cho vui thoi',
      status: 'absent'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'absent'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'attendant'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'attendant'
    },
    {
        name: 'Lập trình PHP',
        code: 'PHP',
        date: '2020/13/10',
        nameDay: 'MO',
        studyTime: 'Ca 1',
        description: 'Bua nay vo hoc cho vui thoi',
        status: 'attendant'
    },
    
    
];

export default class ListScheduleSubjectStudentComponent extends Component {

    constructor (props) {
        super(props)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
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
                        <Text style={ styles.TextDateTime }>
                        &nbsp; Thứ 2 - 20/10
                        </Text>
                        <Text style={ { fontSize: 13 } }></Text>
                    </ListItem.Title>
                    <Badge
                        badgeStyle={{ padding: 12 }}
                        textStyle={{ fontWeight: 'bold' }}
                        value={ item.status == 'future' ? 'Chưa học' : item.status == 'absent' ? 'Vắng mặt' : 'Có mặt' }
                        status={ item.status == 'future' ? 'primary' : item.status == 'absent' ? 'error' : 'success' } />
                </ListItem.Content>

                {/* Bottom content */}
                <ListItem.Content style={ styles.ContentRow }>
                    <ListItem.Subtitle 
                        onPress={ ()=> { this.moreInfoSchedule(item) } }
                        style={{ flex: 1, fontSize: 12, marginTop: 5 }}
                    >
                            Giảng viên: tiennt
                        
                    </ListItem.Subtitle>
                    <ListItem.Subtitle 
                        onPress={ ()=> { this.moreInfoSchedule(item) } }
                        style={{ flex: 1, fontSize: 12, textAlign: 'right', marginTop: 5 }}
                    >
                            7:30 - 9:30 ( Ca 1 )
                    </ListItem.Subtitle>
                
                </ListItem.Content>
                
            </ListItem.Content>
        </ListItem>
    )

    moreInfoSchedule = (item) => {

    }

    render () {
        const { schedules } = this.props;
        // console.log(this.props.navigation)
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