import React, { Component } from 'react';
import { Header } from 'react-native-elements';

import * as COLORS from '../../constants/Colors';


export default class HeaderDefaultComponent extends Component {
    // constructor () {

    // }
    render () {
        const title = this.props.title || 'HEADER';
        const backgroundColor = this.props.backgroundColor || COLORS.PRIMARY;
        return (
            <Header
                centerComponent={{ 
                    text: title, 
                    style: { color: '#fff', fontWeight: 'bold' } 
                }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor = { backgroundColor }
            />
        )
    }
}