import React, { Component } from 'react';

import { 
    View,
    StyleSheet
} from 'react-native';


import { Badge } from 'react-native-elements';

// IMPORT LOCALE
import { APP } from '../../constants/Locale';

// IMPORT COLORS
import * as COLORS from '../../constants/Colors';

// IMPORT ICON
import { 
    AntDesign,
    Feather,
    Fontisto,
    MaterialCommunityIcons
   } from 'react-native-vector-icons';

// IMPORT COMPONENT
import RowProfileComponent from './RowProfileComponent';

export default class ViewInfoStudentComponent extends Component {
    

    render () {
        
        const { user } = this.props;

        return (
            <View style={ styles.ViewAllInfo }>

                <RowProfileComponent 
                    icon={<AntDesign style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'key'} />}
                    label={ APP.roleName }
                    value={ <Badge
                        badgeStyle={ { padding: 10, backgroundColor: COLORS.MAIN_TEXT } }
                        textStyle={{ fontWeight: 'bold' }}
                        value={ APP.studentName }
                      /> }
                />
                <RowProfileComponent 
                    icon={<Feather style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'code'} />}
                    label={ APP.codeStudent }
                    value={user.studentCode.toUpperCase()}
                />

                <RowProfileComponent 
                    icon={<Fontisto style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'email'} />}
                    label={ APP.emailAddress }
                    value={user.email}
                />

                <RowProfileComponent 
                    icon={<MaterialCommunityIcons style={[{ color: COLORS.MAIN_TEXT }]} size={40} name={'door-open'} />}
                    label={ APP.className }
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