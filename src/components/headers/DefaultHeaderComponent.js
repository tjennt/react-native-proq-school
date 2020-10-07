import React, { Component } from 'react';
import { Header } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';


export default class HeaderDefaultComponent extends Component {

    render () {
        const title = this.props.title || 'HEADER';
        const backgroundColor = this.props.backgroundColor || COLORS.MAIN_PRIMARY;
        return (
            <Header
                centerComponent={{ 
                    text: title, 
                    style: { color: COLORS.LIGHT, fontWeight: 'bold' } 
                }}
                rightComponent={{ icon: 'home', color: COLORS.LIGHT }}
                backgroundColor = { backgroundColor }
            />
        )
    }
}