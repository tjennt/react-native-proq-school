import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    Keyboard,
    TouchableOpacity,
    Alert } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    CheckBox, 
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

import Modal, { SlideAnimation, ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

class ModalSearchUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchText: '',
            userIds: [],
            loading: false,
            stopLoad: true,
            groupCreate: false,
            keyboard: false,
            name: '',
            promptVisible: false
        }
    }

    componentDidMount() {
        const { userIds } = this.state
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.setKeyboardTrue
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.setKeyboardFalse
        );
        this.setState({
            userIds: [this.props.user._id, ...userIds]
        })
    }
    
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    setKeyboardTrue = ()=> {
        this.setState({keyboard: true})
    }

    setKeyboardFalse = ()=> {
        this.setState({keyboard: false})
    }

    navigateChat = async (user)=> {
        const { handleModalSearchVisible, navigation } = this.props

        handleModalSearchVisible(false)
        
        navigation.navigate('ChatScreen', {
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

    createGroupChat = ()=> {
        const { userIds, name } = this.state
        this.navigateChat({ 
            userIds: userIds,
            fullName: name,
            name: name,
            type: 'group'
        })
    }

    showModalTextNameGroup = ()=> {
        const { userIds } = this.state
        if (userIds.length == 1) {
            Alert.alert('Cảnh báo', 'Vui lòng chọn người dùng!')
            return
        }
        this.setState({promptVisible: true})
    }

    navigateChat = (user)=> {
        const { handleModalSearchVisible } = this.props
        handleModalSearchVisible(false)
        this.setState({promptVisible: false})
        this.props.navigation.navigate('ChatScreen', {
            data: user,
            user: this.props.user
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity 
                onPress={()=> this.navigateChat({ 
                    id: item.idUser,
                    fullName: item.fullName,
                    type: 'single'
                 })}
                key={index}
                style={styles.ViewUser}
            >
                <Image
                    style={ styles.ImageAvatar }
                    resizeMode="cover"
                    source={ { uri: `${PARAMETER.SERVER}/uploads/user-avatar/${item.avatar}` } }
                />
                <View style={ styles.ViewNameDes }>
                    <Text style={ [GLOBAL_STYLES.TextTitleStyle,  styles.TextName] }>
                        { item.fullName }
                    </Text>
                </View>

                <CheckBox
                    containerStyle={{ position: 'absolute', right: 20, top: 7 }}
                    checkedColor={COLORS.MAIN_TEXT}
                    // uncheckedColor={COLORS.MAIN_TEXT}
                    checked={item.checked_group}
                    onPress={() => this.checkedUserGroup(item, index)}
                />
            </TouchableOpacity>
        )
    }

    checkedUserGroup = async (item, index)=> {
        const { users, userIds } = this.state
        let usersArr = users
        let usersIdsArr = userIds
        
        await usersArr.map((user, key)=> {
            if(index == key) {
                user['checked_group'] = !user['checked_group']
                let key = null
                let userId = usersIdsArr.find(id => id == user.idUser)

                if (typeof userId == 'undefined' && user['checked_group'] == true){
                    usersIdsArr.push(user.idUser)
                }else if (typeof userId != 'undefined' && user['checked_group'] == false) {
                    usersIdsArr = usersIdsArr.filter( user =>{
                        if(user != userId){
                            return user
                        }
                    })
                }
                return user
            }
            return user
        })
        // console.log(usersIdsArr);
        this.setState({
            users: usersArr,
            userIds: usersIdsArr
        })
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
            extraData={this.state}
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
        const { users, keyboard, promptVisible } = this.state;
        const { modalSearchVisible, handleModalSearchVisible } = this.props
        // console.log(users);
        return (
            <Modal
                visible={modalSearchVisible}
                width={1}
                height={ keyboard ? 0.6 : 0.9}
                modalStyle={{ bottom: 0}}
                swipeDirection={['down']}
                swipeThreshold={200}
                modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onSwipeOut={(e) => {
                    handleModalSearchVisible(false)
                }}
                modalTitle={<ModalTitle title="Tìm kiếm mọi người" textStyle={[GLOBAL_STYLES.TextTitleStyle]} />}
            >
                <ModalContent
                    style={{ flex: 1 }}
                >
                    <Input
                        inputContainerStyle={styles.InputSearchUser} 
                        inputStyle={[GLOBAL_STYLES.TextTitleStyle]}
                        placeholder="Mọi người"
                        rightIcon={()=> this.renderButtonSearch()}
                        onChangeText={value => this.setState({ searchText: value })}
                        containerStyle={{borderRadius: 20}}
                        onSubmitEditing={Keyboard.dismiss}
                    />

                    {/* Modal group name */}
                    <Modal
                        visible={promptVisible}
                        width={0.8}
                        height={ keyboard ? 0.3 : 0.3}
                        swipeDirection={['down']}
                        swipeThreshold={200}
                        modalAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                        onSwipeOut={(e) => {
                            this.setState({promptVisible: false})
                        }}
                        modalTitle={<ModalTitle title="Tên nhóm" textStyle={[GLOBAL_STYLES.TextTitleStyle]} />}
                        footer={
                            <ModalFooter>
                              <ModalButton
                                textStyle={[GLOBAL_STYLES.TextTitleStyle]}
                                text="Hủy"
                                onPress={() => { this.setState({promptVisible: false}) }}
                              />
                              <ModalButton
                                textStyle={[GLOBAL_STYLES.TextTitleStyle]}
                                text="Đồng ý"
                                onPress={() => {this.createGroupChat()}}
                              />
                            </ModalFooter>
                        }
                    >
                        <ModalContent
                            style={{alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center'}}
                        >
                            <Input
                                inputStyle={[GLOBAL_STYLES.TextTitleStyle]}
                                inputContainerStyle={{borderBottomWidth:0, paddingTop: 5}} 
                                placeholder="Tên nhóm của bạn"
                                onChangeText={value => this.setState({ name: value })}
                                containerStyle={{borderRadius: 20}}
                            />
                        </ModalContent>

                    </Modal>

                    <TouchableOpacity
                        onPress={()=> { this.showModalTextNameGroup() }}
                    >
                        <Text 
                            style={
                                [
                                    GLOBAL_STYLES.TextTitleStyle,
                                    { 
                                        color: COLORS.MAIN_TEXT,
                                        textAlign: 'right'
                                    }
                                ]
                                }> Tạo nhóm</Text>
                    </TouchableOpacity>
                    
                    <SafeAreaView style={styles.container}>
                        {
                            this.renderListUsersOrEmpty()
                        }
                    </SafeAreaView>
                </ModalContent>
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
        padding: 10,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: COLORS.LIGHT,
        borderBottomColor: COLORS.MAIN_TEXT,
        borderBottomWidth: 0.4
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
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
        paddingTop: 13,
        paddingLeft: 22
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
    },
    InputSearchUser: {
        marginTop: 10,
        borderColor: COLORS.MAIN_TEXT,
        borderWidth: 1, 
        borderRadius: 10, 
        paddingLeft: 7, 
        paddingRight: 7
    }
});