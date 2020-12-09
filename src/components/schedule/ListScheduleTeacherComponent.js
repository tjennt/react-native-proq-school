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
    FontAwesome,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

import GLOBAL_STYLES from '../../styles';

export default class ListScheduleTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSheet: {},
            isVisible: false,
            listDays: []
        }
    }
    
    componentDidMount() {
        const { data, setLoading } = this.props 
        setTimeout(()=> {
            this.setState({
                listDays: data.listDays
            })
            setLoading()
        }, 1)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        const { data } = this.props
        return (
            <ListItem containerStyle={ styles.ListItemSchedule }>
                <TouchableOpacity
                    style={ { flex: 1 } }
                    onPress={ ()=> { this.navigateSchedule(item) } } 
                >
                    {/* CONTENT */}
                    <ListItem.Content>
                        
                        {/* First content */}
                        <ListItem.Content style={ styles.ContentRow }>
                            
                            <ListItem.Title style={styles.text}>
                                { this.renderIconRandom(index) }    
                                <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.TextDateTime] }>
                                    &nbsp; { HelperService.getDateName(item) } - 
                                    (Ca { data.shift })
                                </Text>
                            </ListItem.Title>

                            <ListItem.Subtitle style={ [GLOBAL_STYLES.TextTitleStyle, styles.SubTitleDate]}>
                                { HelperService.getDateFormat(item) } 
                            </ListItem.Subtitle>
                        
                        </ListItem.Content>

                        {/* Bottom content */}
                        <ListItem.Content style={ styles.ContentRowBottom }>

                            <ListItem.Title style={[GLOBAL_STYLES.TextTitleStyle,{ flex: 1 }]}>
                                { data.subject.name.toUpperCase() } - { 'Tìm hiểu về biến ...' }
                                </ListItem.Title>
                    
                            <Badge
                                badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                                textStyle={[GLOBAL_STYLES.ButtonStyle]}
                                value={ data.class.name.toUpperCase() }
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

    navigateSchedule = (day) => {
        const { data } = this.props

        this.props.navigation.navigate( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen', {
            classSubject: {
                idClassSubject: data.idClassSubject,
                day: day
            }
        })
    }

    render () {
        const { data, navigation } = this.props
        const { listDays } = this.state

        return (
            <SafeAreaView style={styles.container}>
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
