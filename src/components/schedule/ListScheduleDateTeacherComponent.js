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

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
    AntDesign 
} from 'react-native-vector-icons';

// IMPORT HELPERS
import * as HelperService from '../../services/HelperService';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../Helpers/EmptyData';
import axios from 'axios';

class ListScheduleDateTeacherComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSheet: {},
            isVisible: false,
            loading: true,
            stopLoad: true,
            listDays: [],
            sheetList: [
                {
                    id: 1,
                    name: 'Điểm danh',
                    style: {},
                    onPress: ()=> {
                        this.setState({ isVisible: false })

                        this.props.navigation.push( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen', {
                            classSubject: this.state.dataSheet
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
    
    componentDidMount() {
        this.getListSchedule()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => {
        return (
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
                                    &nbsp; { HelperService.getDateName(HelperService.getDateNow()) } - 
                                    (Ca { item.shift })
                                </Text>
                            </ListItem.Title>

                            <ListItem.Subtitle style={{ flex: 1, fontSize: 13, textAlign: 'right', marginTop: 5 }}>
                                { HelperService.getDateFormat(HelperService.getDateNow()) } 
                            </ListItem.Subtitle>
                        
                        </ListItem.Content>

                        {/* Bottom content */}
                        <ListItem.Content style={ styles.ContentRowBottom }>

                            <ListItem.Title style={{ flex: 1 }}>
                                { item.subject.name.toUpperCase() } - { 'Môn học thú vị' }
                            </ListItem.Title>
                    
                            <Badge
                                badgeStyle={{ padding: 12, backgroundColor: COLORS.MAIN_TEXT }}
                                textStyle={{ fontWeight: 'bold' }}
                                value={ item.class.name.toUpperCase() }
                                status="success" />

                        </ListItem.Content>
                        
                    </ListItem.Content>
                </TouchableOpacity>
            </ListItem>
        )
    }

    getListSchedule = async ()=> {
        const { user } = this.props
        try {
            let res = await axios.get(`${PARAMETER.SERVER}/v1/teacher/schedules/`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            let { data } = res
            if (data.success) {
                this.setState({ listDays: data.payload, loading: false })
            }else {
                this.setState({ loading: false, stopLoad: false }) 
            }

        } catch (error) {
            console.log(error)
        }
    }

    chooseBottomSheet = (item)=> {
        this.setState({
            dataSheet: {
                idClassSubject: item._id,
                day: HelperService.getDateFormat(HelperService.getDateNow(), 'month_day_year')
            },
            isVisible: true
        })
    }

    navigateSchedule = () => {
        const { dataSheet } = this.state

        this.props.navigation.push( this.props.screenName ? this.props.screenName : 'TeacherScheduleClassScreen')
    }

    render () {
        const { navigation } = this.props
        const { isVisible, sheetList, dataSheet, listDays, loading, stopLoad } = this.state

        return (
            <SafeAreaView 
                style={ 
                    [
                        {
                            flex: loading == false && stopLoad == false 
                                    || loading == true && stopLoad == true 
                                    ? 1 : 0,
                            paddingTop: loading == false && stopLoad == false 
                                    || loading == true && stopLoad == true 
                                    ? 100 : 0 
                        },
                          styles.container
                    ]
                }>
                <EmptyData loading={loading} stopLoad={stopLoad} />
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={listDays}
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ListScheduleDateTeacherComponent);


const styles = StyleSheet.create({
    container: {
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