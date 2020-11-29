import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    Modal,
    TouchableOpacity,
    ActivityIndicator } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Input } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT AXIOS SERVICE
import * as chatService from '../../services/api/chat/chatService';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT LIBRARY
import {
    Entypo,
    AntDesign
  } from 'react-native-vector-icons';

import Toggle from 'react-native-toggle-element';

// Service 
import * as HelperService from '../../services/HelperService';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

import GLOBAL_STYLES from '../../styles';

class ModalSearchUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchText: '',
            loading: false,
            stopLoad: true
        }
    }

    componentDidMount() {
        
    }

    navigateChat = async (user)=> {
        const { handleModalSearchVisible, navigation } = this.props

        await handleModalSearchVisible(false)
        
        navigation.push('ChatScreen', {
            data: user,
            user: this.props.user
        })
    }

    getListUser = async ()=> {
        const { searchText } = this.state
        const { user } = this.props
        await this.setState({ loading: true })
        try {
            let data = await chatService.getListUserSearch({
                user: user,
                searchText: searchText
            })
            this.setState(data)
        } catch (error) {
            console.log(error)
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity 
                onPress={()=> this.navigateChat({ 
                    id: item.idUser,
                    fullName: item.fullName
                 })}
                key={index}
                style={styles.ViewUser}
            >
                <Image
                    style={ styles.ImageAvatar }
                    resizeMode="cover"
                    source={ { uri: `${PARAMETER.SERVER_IMAGE}/uploads/user-avatar/${item.avatar}` } }
                />
                <View style={ styles.ViewNameDes }>
                    <Text style={ [GLOBAL_STYLES.TextTitleStyle,  styles.TextName] }>
                        { item.fullName }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderListUsersOrEmpty = ()=> {
        const { loading, stopLoad, users } = this.state
        if(stopLoad) {
            return <EmptyData loading={loading} stopLoad={stopLoad} />
        }

        if(loading && stopLoad || loading && !stopLoad || users.length == 0) {
            return <EmptyData loading={loading} stopLoad={stopLoad} />
        }
 
        return <FlatList
            keyExtractor={this.keyExtractor}
            data={users}
            renderItem={this.renderItem}
        />
    }

    renderButtonSearch = ()=> {
        return <TouchableOpacity
            onPress={()=> this.getListUser() }
        >
            <AntDesign style={[{color: COLORS.DARK}]} name="search1" size={25} />
        </TouchableOpacity>
    }

    render () {
        const { users } = this.state;
        const { modalSearchVisible, handleModalSearchVisible } = this.props
        return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={modalSearchVisible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <View style={
                        { 
                            flexDirection: 'row',
                            borderBottomColor: COLORS.MAIN_LIGHT,
                            borderBottomWidth: 0.5,
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingRight: 10
                        }
                    }>
                        <TouchableOpacity
                            style={styles.TouchableBack}
                            onPress={()=> handleModalSearchVisible(false)}
                        >
                            <AntDesign style={[{color: COLORS.DARK}]} name="close" size={25} />
                        </TouchableOpacity>
                        <View
                            style={{ flex: 0.9 }}
                        >
                        <Input
                            placeholder="Tìm kiếm mọi người"
                            rightIcon={()=> this.renderButtonSearch()}
                            onChangeText={value => this.setState({ searchText: value })}
                            containerStyle={{borderRadius: 20}}
                        />
                        </View>
                    </View>
                    
                    <SafeAreaView style={styles.container}>
                        {
                            this.renderListUsersOrEmpty()
                        }
                    </SafeAreaView>

                </View>
            </View>
        </Modal>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ModalSearchUserComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingRight: 0
    },
    ViewUser: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: COLORS.LIGHT,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    ViewNameDes: {
        flexDirection: 'column'
    },
    ImageAvatar: {
        width: 45,
        height: 45,
        borderRadius: 45
    },
    TextName: {
        paddingTop: 5,
        paddingLeft: 30
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 600,
        width: '100%',
        borderRadius: 20
    },
    TouchableBack: { 
        flex: 0.1,
        paddingTop: 15
    }
});