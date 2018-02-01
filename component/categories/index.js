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
    View,
    ListView,
    RefreshControl
} from 'react-native';
import AppCard from '../appCard'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
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
export default class Categories extends Component {
    static defaultProps = {
        id: '',
    };
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            itemList:[],
            dataSource:ds,
            isRefreshing: false,
            isVisible: false,
            nextPageUrl:'',
            loadMore:false,
            loadMoreText: '上拉加载更多'
        };
    }
    render() {
        if(this.state.isVisible) {
            return(
                <View style={styles.loadings}>
                    <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={32} type={'FadingCircleAlt'} color={'#8B91FE'}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            initialListSize={10}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    scrollsToTop={true}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.itemList)}
                    renderRow={(rowData,selectionId,rowId) => this.renderRow(rowData,rowId)}
                    onScroll={this._onScrollMore.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                />
                <Toast ref="toast" position='center'/>
            </View>
        );
    }
    componentDidMount() {
        var self = this
        storage.load({
            key: 'categories',
            id: this.props.id
        }).then(response => {
            this.setState({
                itemList:response.itemList,
                nextPageUrl:response.nextPageUrl
            })
            setTimeout( function () {
                self._onRefresh()
            }, 1000)
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            this.getData()
        })
        // this.getData()
    }
    getData () {
        this.setState({
            isRefreshing: true
        })
        fetch(`http://baobab.kaiyanapp.com/api/v5/index/tab/category/${this.props.id}?start=0&num=10`)
            .then(response => response.json())
            .then(response => {
                var followCard = [];
                response.itemList.map((entry, index) => {
                    switch (entry.type) {
                        case 'followCard':
                            followCard.push(entry)
                            break;
                    }

                })
                this.setState({
                    itemList: followCard,
                    isVisible: false,
                    isRefreshing: false,
                    nextPageUrl:response.nextPageUrl
                })
                this.saveStorage()
            })
    }
    _onScrollMore(event) {
        if(this.state.loadMore){
            return;
        }
        var self = this;
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-90) {
            this.setState({
                loadMore:true,
                loadMoreText:'正在加载中...'
            });
            fetch(`${this.state.nextPageUrl}`,{
                timeout: 10 * 1000
            })
                .then(response=>response.json())
                .then(response=> {
                    if(response.itemList.length > 0) {
                        this.setState({
                            loadMore:false,
                            loadMoreText:'上拉加载更多',
                            nextPageUrl:response.nextPageUrl,
                            itemList:this.state.itemList.concat(response.itemList)
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
    renderRow(rowData,rowId) {
            return (
                <View style={styles.cardStyle} key={rowId}>
                    <AppCard {...rowData} goToCustomDetail={() => {this.goToCustomDetail(rowData)}}/>
                </View>
            )
    }
    goToCustomDetail(data) {
        if(!this.props.goToCustomDetail) return
        this.props.goToCustomDetail(data.data.content)
    }
    _onRefresh() {
        this.getData()
    }
    saveStorage () {
        storage.save({
            key: 'categories',  // 注意:请不要在key中使用_下划线符号!
            id:this.props.id,
            data: {
                nextPageUrl:this.state.nextPageUrl,
                itemList:this.state.itemList
            },
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    }
    renderFooter() {
        return(
           <View style={styles.loadMore}>
            <Spinner style={[styles.spinner,{marginRight:5}]} isVisible={this.state.loadMore} size={23} type={'FadingCircleAlt'} color={'#8B91FE'}/>
            <Text>{this.state.loadMoreText}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1728'
    },
    loadings: {
        height: 200,
        alignItems:'center',
        justifyContent:'center'
    },
    cardStyle: {
        marginBottom: 10,
        backgroundColor: '#fff'
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
    }
});

