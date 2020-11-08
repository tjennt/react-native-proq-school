import React, { Component } from 'react';

import { View, 
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Button } from 'react-native';
  
  import {
    Text, 
    ListItem,
    Badge } from 'react-native-elements';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT LIBRARY
import {MaterialCommunityIcons,
    MaterialIcons,
    Fontisto 
} from 'react-native-vector-icons';

// IMPORT AXIOS
import axios from 'axios';

class ListClassComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            classList: []
        }
    }
    componentDidMount() {
        this.getClassApi()
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem 
            // bottomDivider
            containerStyle={ styles.ListItemSchedule }
        >
            <TouchableOpacity
                style={ { flex: 1 } }
                onPress={ ()=> { this.navigateSubjectSchedule(item) } } 
            >
                {/* CONTENT */}
                <ListItem.Content>
                    
                    {/* First content */}
                    <ListItem.Content style={ styles.ContentRow }>
                        
                        <ListItem.Title style={styles.text}>
                            <MaterialCommunityIcons style={[{color: COLORS.DARK, fontWeight: 'bold'}]} size={16} name={'bookmark-outline'} />    
                            <Text style={ styles.TextDateTime }>
                            &nbsp;{ item.subject.name }
                            </Text>
                        </ListItem.Title>
                        <Badge
                            badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                            textStyle={{ fontWeight: 'bold' }}
                            value={ item.class.name.toUpperCase() }
                            status="success" />
                    </ListItem.Content>

                    {/* Bottom content */}
                    <ListItem.Content style={ styles.ContentRow }>

                        <ListItem.Title style={{ flex: 0.6, fontSize: 13 }}>
                        { item.listDays[0] } - { item.listDays[item.listDays.length - 1] } ( Ca { item.shift } )
                        </ListItem.Title>
                
                        <ListItem.Subtitle style={{ flex: 0.4, fontSize: 12, textAlign: 'right', marginTop: 5 }}>
                            Room: { item.roomName.toUpperCase() }
                        </ListItem.Subtitle>
                    
                    </ListItem.Content>
                    
                </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    )

    navigateSubjectSchedule = (item) => {
        this.props.navigation.push('TeacherSubjectScheduleScreen',{
            subjectCode: 'PHP',
            classCode: 'WD14301'
        })
    }

    // Call api
    getClassApi = async ()=> {
        const { user } = this.props
        try {
            let res = await axios.get(`${PARAMETER.SERVER}/v1/teacher/schedulesClass/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            let { data } = res

            if (data.success == true) {
                this.setState({
                    classList: data.payload
                })
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    listViewOrEmpty = ()=> {
        const { classList } = this.state
        if(classList.length != 0) {
            return <FlatList
                keyExtractor={this.keyExtractor}
                data={classList}
                renderItem={this.renderItem}
            />
        }
        return <EmptyData />
    }

    render () {
        const { schedules } = this.props;

        return (
        <SafeAreaView style={styles.container}>
            { this.listViewOrEmpty() }
        </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ListClassComponent);

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