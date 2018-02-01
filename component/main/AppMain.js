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
    StatusBar,
    Dimensions,
    Platform,
    BackAndroid,
    TouchableOpacity
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import TabNavigator from 'react-native-tab-navigator';
import AppHome  from '../home/AppHome'
import Discovery from '../discovery'
import NewsHome from "../news";
import Movie from '../movie'
const { width, height } = Dimensions.get('window');
// app 启动广告图片
const adverAttr = ['http://img.hb.aicdn.com/62f0ab8973fdada6e560244c12eb0dcf9d7061c7729cd-d2OfDn_fw658', 'http://hb-prd.b0.upaiyun.com/images/2017/12/b8a716609a813a009dcfb2d821874f08.jpg', 'http://img.hb.aicdn.com/0d3e44a81b1b2804ef80e726257b381371251e6f1ef0a-46E5xW_fw658', 'http://img.hb.aicdn.com/a0350917a421c53d7f888885c8acb2bdf4b5a10f6bf7b-CdoSdt_fw658']
const adverIndex = Math.floor(Math.random() * adverAttr.length)
export default class AppMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'电影',
            hiddenStatus: true,
            timerNum: 5,
        }
    }
    render() {
        // if (this.state.hiddenStatus) {
        //     return (
        //         <View style={styles.splashStyle}>
        //             <StatusBar
        //                 hidden = {this.state.hiddenStatus}
        //                 translucent={true}
        //                 backgroundColor='#8B91FE'
        //             />
        //             <View style={styles.splashContent}>
        //                 <TouchableOpacity activeOpacity = {1} style={styles.jumpStyle} onPress={()=>{this.closeTimer()}}>
        //                     <Text style={{color:"#fff"}}>{this.state.timerNum}秒跳过广告</Text>
        //                 </TouchableOpacity>
        //                 <Image source={{uri: adverAttr[adverIndex]}} style={styles.splashImage}/>
        //             </View>
        //             <View style={styles.app}>
        //                 <Image source={require('../resource/ic_launcher.png')} style={{width: 80, height: 80}} resizeMode = 'contain'/>
        //                 <Text style={{fontSize: 20,color: '#333'}}>牛油果视频</Text>
        //             </View>
        //         </View>
        //     )
        // }
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <TabNavigator style={styles.navBarContainer} tabBarStyle={{backgroundColor:'#161324'}}>
                    {this.tabRender('首页','首页','home','AppHome')}
                    {this.tabRender('新闻','新闻','globe','NewsHome')}
                    {this.tabRender('视频','视频','map-pin','Discovery')}
                    {this.tabRender('电影','电影','video','Movie')}
                </TabNavigator>
            </View>
        )
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        this.timer = setInterval(() => {
            if (this.state.timerNum <= 1) {
                this.setState({
                    hiddenStatus: false
                })
                clearInterval(this.timer)
            } else {
                this.setState({
                    timerNum: this.state.timerNum - 1
                })
            }

        },1000);
    }
    closeTimer () {
        clearTimeout(this.timer)
        this.setState({
            hiddenStatus: false
        })
    }
    tabRender(title,selectName,renderIcon,component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectName}
                title={title}
                // badgeText = '1'
                titleStyle={{color:'#999'}}
                selectedTitleStyle={{color:'#0DFBFB'}}
                renderIcon={() => <Icon size={25} type='feather' name={renderIcon} color="#999"/>}
                renderSelectedIcon={() =><Icon size={25} type='feather' name={renderIcon} color="#0DFBFB"/>}
                onPress={() => this.setState({ selectedTab: selectName })}>
                {this._renderScene(component)}
            </TabNavigator.Item>
        )
    }
    _renderScene(page) {
        switch(page) {
            case 'AppHome':
                return <AppHome {...this.props}/>;
            case 'Discovery':
                return <Discovery {...this.props}/>;
            case 'NewsHome':
                return <NewsHome {...this.props}/>;
            case 'Movie':
                return <Movie {...this.props}/>;
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：'+routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: '#B3B3B3'
    },
    selectedTabText: {
        color: '#FF546F',
        fontSize:13
    },
    navBarContainer: {
        backgroundColor: '#ffffff'
    },
    splashStyle: {
        position: 'absolute',
        zIndex: 100,
        flex:1,
        width: width,
        height: height,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    splashImage: {
      width: width,
      height: height - 120
    },
    app: {
        height: 120,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    jumpStyle: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.3)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20
    }
});
