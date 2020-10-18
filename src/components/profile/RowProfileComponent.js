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

export default class RowProfileComponent extends Component {
    

    render () {
        const { icon, label, value } = this.props;
        return (
            <View style={ styles.ViewInfo }>
              
                <View style={ styles.ViewIcon }>
                    <Text style={ { textAlign: 'center' } }>
                    { icon }
                    </Text>
                </View>

                <View style={ styles.ViewContentInfo }>
                
                    <View style={ styles.TextTitle }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold' } }>{ label }</Text>
                    </View>
                    
                    <Text style={{ flex: 1, fontSize: 16, color: COLORS.MAIN_LIGHT }}>{ value }</Text>
                
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ViewInfo: {
        flexDirection: "row",
        marginTop: 20,
        width: '100%',
        height: 100,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ViewIcon: {
        flex: 0.2,
        justifyContent: 'center'
    },
        ViewContentInfo: {
        flex: 0.8,
        justifyContent: 'center'
    },
    TextTitle: {
        flex: 1, 
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    }
});