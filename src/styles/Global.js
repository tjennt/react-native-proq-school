import React from 'react';
import { StyleSheet } from 'react-native';
import * as PARAMETER from '../constants/Parameter';


export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    ButtonStyle: {
      fontFamily: PARAMETER.FONT_BOLD_MAIN
    },
    TextStyle: {
      fontFamily: PARAMETER.FONT_MAIN
    },
    TextTitleStyle: {
      fontFamily: PARAMETER.FONT_BOLD_MAIN
    }
});