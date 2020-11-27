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

    renderItem = ({ item, index }) => {
        // let user = item.info.find(x => {
        //     if (x.id == this.props.user._id) {
        //         return 
        //     }
        // });
        console.log(item)
        return(
            <TouchableOpacity 
                onPress={()=> this.navigateChat({ 
                    id: '5fbd3921f6bba175d7dd6509', //item._id,
                    group_id: item._id
                 })}
                key={index}
                style={styles.ViewUser}
            >
                <Image
                    style={ styles.ImageAvatar }
                    resizeMode="cover"
                    source={ { uri: `${PARAMETER.SERVER}/${item.avatar}` } }
                />
                <View style={ styles.ViewNameDes }>
                    <Text style={ [GLOBAL_STYLES.TextTitleStyle,  styles.TextName] }>
                        { item._id }
                    </Text>
                    <ListItem.Title style={ [GLOBAL_STYLES.TextStyle,  styles.TextDes] }>
                        { item.lastMessage }
                    </ListItem.Title>
                </View>
            
            </TouchableOpacity>
        )
    }

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