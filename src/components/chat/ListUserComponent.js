import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    TouchableOpacity } from 'react-native';

import { 
    Card,
    Button, 
    Icon,
    ThemeProvider, 
    ListItem, 
    Avatar } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT COMPONECT EMPTY DATA
import EmptyData from '../../components/Helpers/EmptyData';

// IMPORT LIBRARY
import {Ionicons,
    MaterialIcons,
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

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    navigateChat = (user)=> {
        this.props.navigation.push('ChatScreen', {
            data: user,
            user: this.props.user
        })
    }

    keyExtractor = (user, index) => index.toString()

    renderItem = ({ item, index }) => (
        <TouchableOpacity 
            onPress={()=> this.navigateChat(item)}
            key={index}
            style={styles.ViewUser}
        >
            <Image
                style={ styles.ImageAvatar }
                resizeMode="cover"
                source={ require('../../assets/images/demo/anh_the.jpg') }
            />
            
            <View style={ styles.ViewNameDes }>
                <Text style={ [GLOBAL_STYLES.TextTitleStyle,  styles.TextName] }>
                    { item.name }
                </Text>
                <ListItem.Title style={ [GLOBAL_STYLES.TextStyle,  styles.TextDes] }>
                    Hi em, anh dung day tu chieu ne. · 19:03
                </ListItem.Title>
            </View>
        
        </TouchableOpacity>
    )

    render () {
        const { users } = this.props;
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={users}
                renderItem={this.renderItem}
            />
        </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ListUserComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 0
    },
    ViewUser: {
        flexDirection: 'row',
        paddingBottom: 15
    },
    ViewNameDes: {
        flexDirection: 'column'
    },
    ImageAvatar: {
        width: 55,
        height: 55,
        borderRadius: 55
    },
    TextName: {
        paddingTop: 5,
        paddingLeft: 10
    },
    TextDes: {
        paddingLeft: 10,
        fontSize: 14
    }
});