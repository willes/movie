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
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ListView,
    RefreshControl
} from 'react-native';
import SearchBar from '../searchBar'
import MovieDetail from './movieDetail'
var Spinner = require('react-native-spinkit');
const { width, height } = Dimensions.get('window');
const itemMargin = 10;
const itemWidth = (width - itemMargin * 4) /  3;
const itemHeight = 160;
export default class Movie extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            discovery: [],
            moveList: [],
            selectDis: -1,
            isRefreshing: true,
            pageNum: 1,
            loadMore: false,
            dataSource: ds,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar title={'电影'} desc={'发现最新电影'}/>
                </View>
               <View style={styles.scrollView}>
                   <ScrollView
                       contentContainerStyle={styles.contentContainer}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                   >
                       {
                           this.state.discovery.length > 0 ?
                               <TouchableOpacity activeOpacity = {1} style={[styles.discovery,  this.state.selectDis === -1 ? styles.discoverySelect : null]} onPress={()=>this.fliterMovie(-1)}><Text style={{fontSize: 15, color: this.state.selectDis === -1 ?'#119EAF':'#fff'}}>全部</Text></TouchableOpacity>
                               : null}
                       {this.renderTabel()}
                   </ScrollView>
               </View>
                <ListView
                    enableEmptySections={true}
                    contentContainerStyle={styles.movieList}
                    showsVerticalScrollIndicator={false}
                    renderFooter={this.renderFooter.bind(this)}
                    onScroll={this._onScrollMore.bind(this)}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.moveList)}
                    renderRow={(rowData,selectionId,rowId) => this.renderRow(rowData,rowId)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            initialListSize={10}
                            onRefresh={this.getMovieList.bind(this)}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                </ListView>
            </View>
        );
    }
    componentWillMount() {
        this.getDiscovery()
    }
    renderTabel () {
        return this.state.discovery.map((item,index) => {
            return (<TouchableOpacity  activeOpacity = {1} style={[styles.discovery,  this.state.selectDis === item.id ? styles.discoverySelect : null]} key={index} onPress={()=>this.fliterMovie(item.id)}><Text style={{fontSize: 15, color: this.state.selectDis === item.id?'#119EAF':'#fff'}}>{item.name}</Text></TouchableOpacity>)
        })

    }
    getDiscovery () {
        fetch('http://bd-dy.com/app/categories')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    discovery: response
                })
                this.getMovieList()
            })
    }
    getMovieList () {
        console.log(this.state.pageNum)
        fetch(`http://bd-dy.com/app/movies?pageNum=${this.state.pageNum}`).then(response => response.json())
            .then(response => {
                this.setState({
                    moveList: this.state.moveList.concat(response.content)
                })
                this.setState({
                    isRefreshing: false,
                    loadMore: false
                })
            })
            .catch(()=>{
                this.setState({
                    isRefreshing: false,
                    loadMore: false
                })
            })
    }
    renderRow(rowData,rowId) {
        var self = this;
            return (
                <TouchableOpacity key={rowId} activeOpacity={1} onPress={()=> this.goToCustomDetail(rowData.id)}>
                <View style={styles.movieItem}>
                    <Image source={{uri: `http://static.bd-dy.com/img/${rowData.coverPic}`}} style={styles.movieItemImg}/>
                    <Text numberOfLines={2} style={{paddingVertical: 10, fontSize: 14, color: '#fff'}}>{self.filteTitle(rowData.title)}</Text>
                </View>
                </TouchableOpacity>
            )
    }
    fliterMovie (id) {
        this.setState({
            selectDis: id
        })
    }
    renderFooter() {
        return(
            <View style={styles.loadMore}>
                <Spinner style={[styles.spinner,{marginRight:5}]} isVisible={this.state.loadMore} size={23} type={'FadingCircleAlt'} color={'#fff'}/>
            </View>
        )
    }
    _onScrollMore(e) {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            console.log(1)
            this.setState({
                loadMore: true
            })
            this.state.pageNum++
            // this.setState({
            //     pageNum: this.state.pageNum + 1
            // })
            this.getMovieList()
        }
    }
    goToCustomDetail(id){
        this.props.navigator.push({
            component:MovieDetail,
            params:{
                data: id
            }
        });
    }
    filteTitle (str) {
        return str.substring(str.indexOf('《') + 1, str.indexOf('》'))
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#1A1728'
    },
    scrollView: {
      height: 50
    },
    paddingStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
    contentContainer: {
        margin: 10
    },
    discovery: {
        marginRight: 10,
        height: 30,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discoverySelect : {
        borderRadius: 3,
        backgroundColor: '#F4F7FC'
    },
    movieItem: {
        width: itemWidth,
        marginLeft: itemMargin,
        marginBottom: itemMargin,
        alignItems: 'center'
    },
    movieItemImg: {
        width: itemWidth,
        height: itemHeight,
        borderRadius: 3
    },
    movieList: {
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems:'flex-start'
    },
    loadMore: {
        width: width,
        alignItems: 'center',
        marginBottom: 10,
        height: 30
    }
});

