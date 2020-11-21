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
    AntDesign,
    Feather,
    Fontisto,
    MaterialCommunityIcons
   } from 'react-native-vector-icons';

// IMPORT COMPONENT
import RowProfileComponent from './RowProfileComponent';

import GLOBAL_STYLES from '../../styles';

export default class ViewInfoStudentComponent extends Component {
    

    render () {
        
        const { user } = this.props;

        return (
            <View style={ styles.ViewAllInfo }>
                {/* BACKGROUND, AVATAR, FULL NAME */}
                <ImageBackground
                style={ styles.ImageBackground }
                source={ require('../../assets/images/illustrators/info-student.png') }
                >

                    <Avatar
                        source={ {
                        uri: `${PARAMETER.SERVER}/${user.studentId.avatar}`
                        } }
                        style={ styles.Avatar }
                        avatarStyle={styles.AvatarStyle}
                    />

                    <Text style={ [GLOBAL_STYLES.TextTitleStyle, styles.TextName] }>
                        { user.studentId.fullName.toUpperCase() }
                    </Text>

                </ImageBackground>

                <RowProfileComponent 
                    icon={<AntDesign style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'key'} />}
                    label={ APP.roleName }
                    value={ <Badge
                        badgeStyle={ { padding: 10, backgroundColor: COLORS.MAIN_TEXT } }
                        textStyle={[GLOBAL_STYLES.ButtonStyle ]}
                        value={ APP.studentName }
                      /> }
                />
                
                <RowProfileComponent 
                    icon={<MaterialCommunityIcons style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'door-open'} />}
                    label={ APP.className }
                    value={user.studentId.class.toUpperCase() ?? '-'}
                />

                <RowProfileComponent 
                    icon={<Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />}
                    label={ APP.codeStudent }
                    value={user.studentId.studentCode.toUpperCase() ?? '-'}
                />
                <RowProfileComponent 
                    icon={<Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />}
                    label={ "Số CMND" }
                    value={user.studentId.identityNumber  ?? '-'}
                />
                <RowProfileComponent 
                    icon={<Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />}
                    label={ "Ngày sinh" }
                    value={user.studentId.dob  ?? '-'}
                />
                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ "Địa chỉ" }
                    value={user.studentId.address  ?? '-'}
                />
                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ "Số điện thoại" }
                    value={user.studentId.phone  ?? '-'}
                />
                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ APP.emailAddress }
                    value={user.email  ?? '-'}
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
        bottom: -30,
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