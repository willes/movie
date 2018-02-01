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
    Dimensions,
    ScrollView,
    BackAndroid,
    Platform,
    RefreshControl
} from 'react-native';
import SearchBar from '../searchBar'
import AppCard from '../appCard'
import Banner from '../banner/index'
import AppDetail from '../detail'
import Toast, {DURATION} from 'react-native-easy-toast'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
const { width, height } = Dimensions.get('window');
import {
    LazyloadScrollView,
    LazyloadView
} from 'react-native-lazyload';
import * as Animatable from 'react-native-animatable'
var Spinner = require('react-native-spinkit');
var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期

})
export default class AppHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            data: {},
            squareCardCollection: null,
            index: 0,
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: 32,
            isVisible: false,
            isRefreshing: false,
            loadMore:false,
            followCard:[],
            page:1,
            loadMoreText: '',
            resultNum: 0,
            resultAnd: 'zoomIn'
        };
    }
    render() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        return (
            <View style={styles.container} >
            <View>
                <SearchBar/>
            </View>
            <LazyloadScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="加载中..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffffff"
                    />
                }
                showsVerticalScrollIndicator = {false}
                onScroll={this._onScrollMore.bind(this)}
            >
                { this.state.resultNum ? <Animatable.View style = {styles.resultNum} easing="ease-out" animation={this.state.resultAnd} duration = {500}><Text style = {{color: '#fff', fontSize: 15}}>为你推荐了{this.state.resultNum}条信息</Text></Animatable.View>
                :null}
                <View style={styles.bannerStyle}>
                    <Banner data={this.state.squareCardCollection?this.state.squareCardCollection.data.itemList:[]}  goToCustomDetail={(data) => {this.goToCustomDetail(data)}}/>
                </View>
                {this.getSlides()}
                {/*loadMore*/}
                {!this.state.isVisible?<View style={styles.loadMore}>
                    <Spinner style={[styles.spinner,{marginRight:5}]} isVisible={this.state.loadMore} size={23} type={'FadingCircleAlt'} color={'#8B91FE'}/>
                    <Text>{this.state.loadMoreText}</Text>
                </View>:null}

            </LazyloadScrollView>
                <Toast ref="toast" position='center'/>
            </View>
        );
    }
    componentWillMount(){
        var self = this
        storage.load({
            key: 'homeData'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
           this.setState({
               page:ret.page,
               isVisible:false,
               followCard:ret.followCard,
               squareCardCollection:ret.squareCardCollection
           })
            setTimeout( function () {
                self._onRefresh()
            }, 1000)
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            this._onRefresh()
        })
    }
    _onRefresh() {
        var self = this
        this.setState({
            isRefreshing: true
        })
        fetch('http://baobab.kaiyanapp.com/api/v5/index/tab/allRec?page=0&udid=bd643d6b0262437cb40b4fb24861ff66bc33cfff&vc=231&vn=3.14&first_channel=eyepetizer_zhihuiyun_market&last_channel=eyepetizer_zhihuiyun_market&system_version_code=24',{
            timeout: 10 * 1000
        })
            .then(response =>response.json())
            .then(response => {
                this.setState({
                    data: response,
                    isRefreshing: false
                })
                var followCard = [];
                response.itemList.map((entry, index) => {
                    switch (entry.type) {
                        case 'squareCardCollection':
                            this.setState({squareCardCollection: entry})
                            break;
                        case 'followCard':
                            followCard.push(entry)
                            break;
                    }
                })
                this.setState({
                    followCard: followCard,
                    resultNum: followCard.length
                })
                setTimeout(function() {
                    self.setState({
                        resultNum: 0
                    })
                }, 3000)
                this.saveStorage()
            }).catch(error => {
            this.setState({
                isRefreshing: false
            })
            this.refs.toast.show('网络错误,请检查网络连接');
        });
    }
    _onScrollMore(event) {
        if(this.state.loadMore){
            return;
        }
        var self = this;
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20) {
            this.setState({
                loadMore:true,
                loadMoreText:'正在加载中...'
            });
            fetch(`http://baobab.kaiyanapp.com/api/v5/index/tab/allRec?page=${this.state.page}&udid=bd643d6b0262437cb40b4fb24861ff66bc33cfff`,{
                timeout: 10 * 1000
            })
                .then(response=>response.json())
                .then(response=> {
                    if(response.itemList.length > 0) {
                        this.setState({
                            loadMore:false,
                            loadMoreText:'上拉加载更多',
                            page: this.state.page + 1,
                            followCard:this.state.followCard.concat(response.itemList)
                        })
                        this.saveStorage()
                    } else {
                        this.setState({
                            loadMore:false,
                            loadMoreText:'没有啦'
                        })
                    }
                }).catch(error => {
                this.setState({
                    loadMore:false,
                    loadMoreText:'上拉加载更多'
                });
                this.refs.toast.show('网络错误,请检查网络连接');
            })
        }
    }
    // 获取首页数据
    getHomeData () {
        fetch('http://baobab.kaiyanapp.com/api/v5/index/tab/allRec?page=0&udid=bd643d6b0262437cb40b4fb24861ff66bc33cfff&vc=231&vn=3.14&first_channel=eyepetizer_zhihuiyun_market&last_channel=eyepetizer_zhihuiyun_market&system_version_code=24',{
            timeout: 10 * 1000
        })
            .then(response =>response.json())
            .then(response => {
                this.setState({
                    data: response,
                    isVisible: false
                })
                var followCard = [];
                response.itemList.map((entry, index) => {
                    switch (entry.type) {
                                case 'squareCardCollection':
                                    this.setState({squareCardCollection: entry})
                                    break;
                                case 'followCard':
                                    followCard.push(entry)
                                    break;
                            }

                })
                this.setState({followCard: followCard})
                this.saveStorage()
            }).catch(error => {
            this.setState({
                isVisible: false
            })
            this.refs.toast.show('网络错误,请检查网络连接');
        });
    }
    getSlides () {
        if (!this.state.followCard) {
            return false;
        }
        return this.state.followCard.map((item, index) => {
           if(!item.data.content.data.adTrack)
                return (
                    <LazyloadView style={styles.cardStyle} key={index}>
                        <AppCard {...item} goToCustomDetail={(data) => {this.goToCustomDetail(data)}}/>
                    </LazyloadView>
                );
        });
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
    onBackAndroid = () => {
        const navigator = this.props.navigator;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;// 接管默认行为
        }
        return false; // 默认行为
    }
    saveStorage () {
        storage.save({
        key: 'homeData',  // 注意:请不要在key中使用_下划线符号!
        data: {
            page:this.state.page,
            followCard:this.state.followCard,
            squareCardCollection: this.state.squareCardCollection
        },
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        expires: null
    });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1728'
    },
    paddingStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
    bannerStyle: {
        marginVertical: 10,
        backgroundColor: '#1A1728'
    },
    cardStyle: {
        marginBottom: 10,
        backgroundColor: '#1A1627'
    },
    detailBox: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom: 0,
        zIndex:100
    },
    loadings: {
        height: 200,
        alignItems:'center',
        justifyContent:'center'
    },
    loadMore:{
        flex:1,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    resultNum: {
        paddingVertical: 8,
        alignItems:'center',
        justifyContent:'center'
    }
});
