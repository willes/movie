import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NetInfo,
    Navigator
} from 'react-native';
import AppMain from './component/main/AppMain'
import Toast, {DURATION} from 'react-native-easy-toast'
export default class orange extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Navigator
                  initialRoute={{component:AppMain}}
                  configureScene={(route)=>this._configureScene(route)}
                  renderScene={(route, navigator) => {
                      let Component = route.component;
                      return <Component {...route.params} navigator={navigator}/>
                  }} />
                <Toast ref="toast" position='center'/>
            </View>
        );
    }
    componentDidMount(){
        //监听网络变化事件
        // NetInfo.addEventListener('connectionChange', (ConnectionType) => {
        //     console.log(ConnectionType)
        //     !ConnectionType && this.refs.toast.show('无法连接网络,请稍后再试');
        // })
        // NetInfo.isConnectionExpensive((isConnectionExpensive) => {
        //     alert('Connection is ' + (isConnectionExpensive ? 'Expensive' : 'Not Expensive'));
        // })
        // 监听网络变化
        NetInfo.addEventListener(
            'change',
            this._handleConnectionInfoChange
        )
        // 定位 http://restapi.amap.com/v3/geocode/regeo?output=json&location=104.06788,30.744416&key=258b3a0184d127e63ece0a996180fae1&radius=1000&extensions=all
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                console.log(initialPosition)
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    _handleConnectionInfoChange(connectionInfo) {
        console.log(JSON.stringify(connectionInfo))
    }
    _configureScene(route){
        let type = route.type;
        switch (type){
            case 'FloatFromRight':
                return Navigator.SceneConfigs.FloatFromRight;
                break;
            case 'FloatFromLeft':
                return Navigator.SceneConfigs.FloatFromLeft;
                break;
            case 'FloatFromBottom':
                return Navigator.SceneConfigs.FloatFromBottom;
                break;
            case 'FloatFromBottomAndroid':
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
            case 'FadeAndroid':
                return Navigator.SceneConfigs.FadeAndroid
                break;
            case 'HorizontalSwipeJump':
                return Navigator.SceneConfigs.HorizontalSwipeJump;
                break;
            case 'HorizontalSwipeJumpFromRight':
                return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                break;
            case 'VerticalUpSwipeJump':
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
                break;
            case 'VerticalDownSwipeJump':
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
                break;
            default:
                return Navigator.SceneConfigs.PushFromRight;

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

AppRegistry.registerComponent('orange', () => orange);