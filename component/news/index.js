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
import NewsList  from '../newsList'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import NewsDetail from "../news/detail";

export default class Discovery extends Component {
    static defaultProps = {
        item: [
            {
                label:'推荐',
                channel:'__all__'
            },
            {
                label:'热点',
                channel:'news_hot'
            },
            {
                label:'游戏',
                channel:'news_game'
            },
            {
                label:'时尚',
                channel:'news_fashion'
            },
            {
                label:'体育',
                channel:'news_sports'
            },
            {
                label:'国际',
                channel:'news_world'
            },
            {
                label:'财经',
                channel:'news_finance'
            },
            {
                label:'军事',
                channel:'news_military'
            },
            {
                label:'社会',
                channel:'news_society'
            },
            {
                label:'养生',
                channel:'news_regimen'
            },
            {
                label:'汽车',
                channel:'news_car'
            },
            {
                label:'娱乐',
                channel:'news_entertainment'
            },
            {
                label:'科技',
                channel:'news_tech'
            },
            {
                label:'旅游',
                channel:'news_travel'
            },
            {
                label:'历史',
                channel:'news_history'
            },
            {
                label:'美食',
                channel:'news_food'
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
                    <SearchBar title={'新闻'} desc={'挖掘各种资讯,让你最先了解世界'}/>
                </View>
                <ScrollableTabView
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#F5326A'
                    tabBarInactiveTextColor='#333'
                    scrollsToTop={true}
                    tabBarTextStyle={{fontSize: 16}}
                    renderTabBar={() => <ScrollableTabBar style={{backgroundColor:'#ffffff',borderBottomColor:'#F6F6F6' }} />}
                >
                    {this.renderTabel()}
                </ScrollableTabView>
            </View>
        );
    }
    componentWillMount() {
    }
    renderTabel () {
        return this.props.item.map((item,index) => {
            // <Categories tabLabel={item.label} key={index} id={item.id} goToCustomDetail={(data) => {this.goToCustomDetail(data)}}/>
            return (<NewsList tabLabel={item.label} key={index} channel={item.channel}  goToCustomDetail = {(data)=> this.goToCustomDetail(data)}/>)
        })
    }
    goToCustomDetail(rowData){
        var self = this;
        this.props.navigator.push({
            component:NewsDetail,
            params:{
                'data':rowData,
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    paddingStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
});

