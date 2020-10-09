import React, { Component } from 'react';

import { View } from 'react-native';
// IMPORT LOADER
import ContentLoader  from 'react-native-easy-content-loader';

export default class ListNewsComponent extends Component {
    

    render () {
        const { loading } = this.props;
        return (
            <View style={{ marginTop: 15 }}>
                <ContentLoader
                    avatar
                    aShape="square"
                    aSize="large"
                    pRows={1}
                    pHeight={[20]}
                    pWidth={[300]}
                    listSize={8}
                    loading={ loading }
                />
            </View>
        )
    }
}