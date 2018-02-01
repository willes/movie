/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import SearchBar from '../searchBar'
import Categories  from '../categories'
import AppDetail from '../detail'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default class Discovery extends Component {
    static defaultProps = {
        item: [
            {
                label:'时尚',
                id:'24'
            },
            {
                label:'运动',
                id:'18'
            },
            {
                label:'创意',
                id:'2'
            },
            {
                label:'广告',
                id:'14'
            },
            {
                label:'音乐',
                id:'20'
            },
            {
                label:'旅行',
                id:'6'
            },
            {
                label:'生活',
                id:'36'
            },
            {
                label:'记录',
                id:'22'
            },
            {
                label:'开胃',
                id:'4'
            },
            {
                label:'游戏',
                id:'30'
            },
            {
                label:'萌宠',
                id:'26'
            },
            {
                label:'动画',
                id:'10'
            },
            {
                label:'科普',
                id:'32'
            },
            {
                label:'剧情',
                id:'12'
            },
            {
                label:'搞笑',
                id:'28'
            },
            {
                label:'预告',
                id:'8'
            },
            {
                label:'综艺',
                id:'38'
            },
            {
                label:'集锦',
                id:'34'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar title={'发现'} desc={'发现不一样的世界,不一样的自己'}/>
                </View>
                <ScrollableTabView
                        initialPage={0}
                        tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                        tabBarBackgroundColor='#FFFFFF'
                        tabBarActiveTextColor='#F5326A'
                        tabBarInactiveTextColor='#fff'
                        tabBarTextStyle={{fontSize: 16}}
                        renderTabBar={() => <ScrollableTabBar style={{backgroundColor:'#1A1625',borderBottomColor:'#000' }} />}
                    >
                        {this.renderTabel()}
                        {/*<Text tabLabel='时尚' id='24'>11</Text>*/}
                        {/*<Text tabLabel='运动' id='18'>1</Text>*/}
                        {/*<Text tabLabel='创意' id='2'>1</Text>*/}
                        {/*<Text tabLabel='广告' id='14'>1</Text>*/}
                        {/*<Text tabLabel='音乐' id='20'>1</Text>*/}
                        {/*<Text tabLabel='旅行' id='6'>1</Text>*/}
                        {/*<Text tabLabel='生活' id='36'>1</Text>*/}
                        {/*<Text tabLabel='记录' id='22'>1</Text>*/}
                        {/*<Text tabLabel='开胃' id='4'>1</Text>*/}
                        {/*<Text tabLabel='游戏' id='30'>1</Text>*/}
                        {/*<Text tabLabel='萌宠' id='26'>1</Text>*/}
                        {/*<Text tabLabel='动画' id='10'>1</Text>*/}
                        {/*<Text tabLabel='科普' id='32'>1</Text>*/}
                        {/*<Text tabLabel='剧情' id='12'>1</Text>*/}
                        {/*<Text tabLabel='搞笑' id='28'>1</Text>*/}
                        {/*<Text tabLabel='预告' id='8'>1</Text>*/}
                        {/*<Text tabLabel='综艺' id='38'>1</Text>*/}
                        {/*<Text tabLabel='集锦' id='34'>1</Text>*/}
                    </ScrollableTabView>
            </View>
        );
    }
    componentWillMount() {
        this.getDiscovery()
    }
    renderTabel () {
            return this.props.item.map((item,index) => {
                  return (<Categories tabLabel={item.label} key={index} id={item.id} goToCustomDetail={(data) => {this.goToCustomDetail(data)}}/>)
            })
    }
    getDiscovery () {
        fetch('http://baobab.kaiyanapp.com/api/v4/categories/all?udid=bd643d6b0262437cb40b4fb24861ff66bc33cfff&vc=234&vn=3.14&first_channel=eyepetizer_zhihuiyun_market&last_channel=eyepetizer_zhihuiyun_market&system_version_code=24')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    categories:response.itemList
                })
            })
    }
    goToCustomDetail(rowData){
        var self = this;
        this.props.navigator.push({
            component:AppDetail,
            type:'FloatFromBottom',
            params:{
                'data':rowData,
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1625'
    },
    paddingStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
});

