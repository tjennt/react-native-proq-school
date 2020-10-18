import React, { Component } from 'react';

import { 
    View,
    StyleSheet
} from 'react-native';


import { Image,
    Avatar,
    Accessory,
    Text,
    SocialIcon,
    Card } from 'react-native-elements';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';

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
        return (
            <View style={ styles.ViewAllInfo }>

                <RowProfileComponent 
                    icon={<Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />}
                    label={ APP.codeTeacher }
                    value={user.studentCode.toUpperCase()}
                />

                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ APP.emailAddress }
                    value={user.email}
                />

                <RowProfileComponent 
                    icon={<MaterialCommunityIcons style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'door-open'} />}
                    label="Tên lớp học"
                    value={user.className.toUpperCase()}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
  ViewAllInfo: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20
  }
});