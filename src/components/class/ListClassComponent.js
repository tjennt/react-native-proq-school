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
import {AntDesign,
    FontAwesome 
} from 'react-native-vector-icons';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

import GLOBAL_STYLES from '../../styles';

class ListClassComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            classList: [],
            loading: true,
            refreshing: false
        }
    }
    componentDidMount() {
        this.getClassApi()
    }
    
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
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
                        
                        <ListItem.Title style={ styles.text }>
                            { this.renderIconRandom(index) }
                            <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.TextDateTime ] }>
                            &nbsp;{ item.subject.name }
                            <Text style={[GLOBAL_STYLES.TextTitleStyle, { fontSize: 15 }]}> ( ca: { item.shift })</Text>
                            </Text>
                        </ListItem.Title>
                        <Badge
                            badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                            textStyle={[GLOBAL_STYLES.ButtonStyle]}
                            value={ item.class.name.toUpperCase() }
                            status="success" />
                    </ListItem.Content>

                    {/* Bottom content */}
                    <ListItem.Content style={ styles.ContentRow }>

                        <ListItem.Subtitle style={[GLOBAL_STYLES.TextTitleStyle, styles.TitleDateRange ]}>
                            { HelperService.getDateFormat(item.startAt, 'date_time') } - { HelperService.getDateFormat(item.endAt) }
                        </ListItem.Subtitle>
                
                        <ListItem.Subtitle style={[GLOBAL_STYLES.TextTitleStyle, styles.SubTitleTime ]}>
                            { this.getBadgeWeekDays(item.weekDays) }
                        </ListItem.Subtitle>
                    
                    </ListItem.Content>
                    
                </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    )

    renderIconRandom = (index)=> {
        if (index % 2) {
            return <AntDesign style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'staro'} />
        }
        if (index % 3) {
            return <FontAwesome style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'leanpub'} />
        }

        return <FontAwesome style={[{color: COLORS.PRIMARY, fontWeight: 'bold'}]} size={16} name={'leaf'} />
    }
    
    getBadgeWeekDays = (weekDays)=> {
        
        return weekDays.map((day, index)=> {
            let dayString
            if (day == 0){
                dayString = 'CN'
            }else {
                dayString = ++day
            }
            
            return <Badge
            badgeStyle={{ padding: 5, marginRight: 3, backgroundColor: COLORS.BADGE_RANDOM[index] }}
            textStyle={[GLOBAL_STYLES.ButtonStyle]}
            value={ dayString }
            status="success" />
        })
        
    }

    navigateSubjectSchedule = (item) => {
        const { navigation } = this.props
        let self = this
        try {
            
            navigation.navigate('TeacherSubjectScheduleScreen',{
                data: {
                    idClassSubject: item._id,
                    listDays: item.listDays,
                    shift: item.shift,
                    class: item.class,
                    subject: item.subject,
                    weekDays: item.weekDays,
                    season: item.season
                }
            })
            
            
        } catch (error) {
            console.log('ERROR', error)
        }
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

            if (data.success) {
                this.setState({
                    classList: data.payload,
                    loading: false
                })
            }
        } catch (error) {
            this.setState({loading: false})
            console.log("ERROR", error)
        }
    }
    pullToRefresh = async ()=> {
        await this.setState({ refreshing: true })
        await this.getClassApi()
        this.setState({ refreshing: false })
    }

    listViewOrEmpty = ()=> {
        const { classList, loading, refreshing } = this.state
        if(classList.length != 0) {
            return <FlatList
                keyExtractor={this.keyExtractor}
                data={classList}
                renderItem={this.renderItem}
                refreshing={refreshing}
                onRefresh={()=> this.pullToRefresh()}
            />
        }
        return <EmptyData loading={loading} />
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
    },
    TitleDateRange: { 
        flex: 0.6, 
        fontSize: 13
    },
    SubTitleTime: { 
        flex: 0.4,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 5
    }
});