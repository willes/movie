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
    Image,
    Dimensions,
    ScrollView,
    Platform,
    StatusBar,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import Echarts from 'native-echarts';
import Canvas from 'react-native-canvas';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements'
import VideoPlayer from '../videoPlayer'
const { width, height } = Dimensions.get('window');
export default class AppDetail extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.data.data
        return (
            <View style={styles.container} >
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                {/*header*/}
                    <View style={styles.headerStyle}>
                            <VideoPlayer url={data.playInfo[data.playInfo.length - 1].url} callback={()=>this.callback()}/>
                            {/*<Image source={{uri: data.cover.feed}} style={styles.playImgStyle}/>*/}
                    </View>
                {/*content*/}
                    <View style={styles.contentStyle}>
                        {/*简介*/}
                        <View style={styles.descaptionStyle}>
                            <Animatable.View style={styles.descHeaderStyle}>
                                <View>
                                    <Text style={{fontSize: 16, color:'#333', fontWeight:'bold',marginBottom: 5}}>{data.title}</Text>
                                </View>
                                {/*<View>*/}
                                    {/*<Text>简介</Text>*/}
                                {/*</View>*/}
                            </Animatable.View >
                            {/*内容*/}
                            <Animatable.View style={styles.descontentStyle}>
                                <Text numberOfLines={2} style={styles.descText}>{data.description}</Text>
                            </Animatable.View>
                            {/*播放次数*/}
                            <Animatable.View style={styles.consumption}>
                            <View style={styles.consumptionItem}>
                                <Icon
                                    name='star'
                                    type='evilicon'
                                    color='#828282'
                                    size={30}
                                />
                                <Text style={styles.consumptionText}>{data.consumption.collectionCount}</Text>
                            </View>
                            <View style={styles.consumptionItem}>
                                <Icon
                                    name='external-link'
                                    type='evilicon'
                                    color='#828282'
                                    size={30}
                                />
                                <Text style={styles.consumptionText}>{data.consumption.shareCount}</Text>
                            </View>
                            <View style={styles.consumptionItem}>
                                <Icon
                                    name='comment'
                                    type='evilicon'
                                    color='#828282'
                                    size={30}
                                />
                                <Text style={styles.consumptionText}>{data.consumption.replyCount}</Text>
                            </View>
                        </Animatable.View>
                            <Animatable.View  style={styles.author}>
                            <View style={styles.authorLeftStyle}>
                                <Image source={{uri:data.author.icon}} style={styles.iconStyle}/>
                                <View>
                                    <Text style={{fontSize:16,color:'#EC393E',paddingBottom: 5}}>{this.relpaceTitle(data.author.name)}</Text>
                                    <Text numberOfLines = {1} style={{fontSize:13,color:'#000'}}>{this.relpaceTitle(data.author.description)}</Text>
                                </View>
                            </View>
                            <View style={styles.authorRightStyle}>
                            </View>
                        </Animatable.View>
                        </View>
                    </View>
     </View>
        );
    }
    componentDidMount () {
    }
    relpaceTitle (value) {
        return value.replace(/(开眼)/g,'')
    }
    callback () {
        this.props.navigator.pop()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerStyle: {
        position: 'relative',
        height: height * 0.4
    },
    playImgStyle: {
      width: width,
      height: height * 0.4
    },
    contentStyle: {
        flex:1,
        backgroundColor:'#fff'
    },
    backStyle: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex:10,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,.6)'
    },
    descaptionStyle:{
        padding: 10
    },
    descHeaderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    descontentStyle: {
        paddingVertical: 10
    },
    descText: {
        lineHeight:23,
        fontSize: 15
    },
    consumption: {
        marginVertical: 10,
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    consumptionItem: {
        alignItems: 'center'
    },
    consumptionText:{
        fontSize: 15,
        fontWeight:'bold'
    },
    iconStyle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 10
    },
    author: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    authorLeftStyle: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorRightStyle: {
        width: 100
    }
});
