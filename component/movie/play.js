/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation';
import { Icon } from 'react-native-elements'
import VideoPlayer from '../videoPlayer'
const { width, height } = Dimensions.get('window');
export default class Play extends Component {
    render() {
        const data = this.props.data[0].url.split('|')[2]
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                {/*header*/}
                <View style={styles.headerStyle}>
                    <VideoPlayer url={data} callback={()=>this.goBack()}/>
                    {/*<Image source={{uri: data.cover.feed}} style={styles.playImgStyle}/>*/}
                </View>
                {/*content*/}
            </View>
        );
    }

    componentWillMount() {
        // The getOrientation method is async. It happens sometimes that
        // you need the orientation at the moment the JS runtime starts running on device.
        // `getInitialOrientation` returns directly because its a constant set at the
        // beginning of the JS runtime.
        Orientation.lockToLandscapeLeft();
        // const initial = Orientation.getInitialOrientation()
        // if (initial === 'PORTRAIT') {
        //     // do something=
        // } else {
        //     Orientation.lockToLandscapeLeft();
        //     // do something else
        // }
    }
    goBack() {
        Orientation.lockToPortrait()
        this.props.navigator.pop()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: {
        position: 'relative',
        height: width,
        width: height + 20
    },
});
