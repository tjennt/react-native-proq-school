import React, { Component } from 'react';

import { 
    View,
    StyleSheet,
    ImageBackground
} from 'react-native';


import { Badge, Text, Avatar } from 'react-native-elements';

// IMPORT LOCALE
import { APP } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT ICON
import { 
    Feather,
    Fontisto,
    MaterialCommunityIcons
   } from 'react-native-vector-icons';
   
// IMPORT COMPONENT
import RowProfileComponent from './RowProfileComponent';

export default class ViewInfoTeacherComponent extends Component {
    

    render () {
        const { user } = this.props;
        console.log("TEACHER", user)
        return (
            <View style={ styles.ViewAllInfo }>

                {/* BACKGROUND, AVATAR, FULL NAME */}
                <ImageBackground
                style={ styles.ImageBackground }
                source={ require('../../assets/images/illustrators/info-student.png') }
                >

                    <Avatar
                        source={ {
                        uri: `${PARAMETER.SERVER}/${user.teacherId.avatar}`
                        } }
                        style={ styles.Avatar }
                        avatarStyle={styles.AvatarStyle}
                    />

                    {/* <Text style={ styles.TextName }>{ user }</Text> */}

                </ImageBackground>


                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ APP.emailAddress }
                    value={user.email}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ImageBackground: {
        height: 220,
        marginBottom: 70
    },
    Avatar: {
        position: 'absolute',
        left: 20,
        bottom: -45,
        width: 100,
        height: 100,
    },
    AvatarStyle: {
        resizeMode : 'cover',
        borderRadius: 55,
        borderWidth: 2,
        borderColor: COLORS.LIGHT
    },
    TextName: {
        position: 'absolute',
        left: 135,
        bottom: -25,
        padding: 3,
        fontSize: 20,
        fontWeight: 'bold'
    },
    ViewAllInfo: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20
    }
});