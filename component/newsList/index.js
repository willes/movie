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
    View,
    ScrollView,
    RefreshControl, ListView
} from 'react-native';
import NewsCard from '../appCard/newCard'
export default class NewsList extends Component {
    static defaultProps = {
        channel: '',
    };
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isRefreshing: true,
            dataSource:ds,
            itemList: [],
            min_behot_time: '', // 刷新时间
            max_behot_time: Math.ceil(new Date().getTime() / 1000) // 加载更多
        }
    }
    render() {
        return (
            <ListView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        tintColor="#ff0000"
                        title="加载中..."
                        titleColor="#00ff00"
                        onRefresh={this._onRefresh.bind(this)}
                        initialListSize={10}
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffffff"
                    />
                }
                showsVerticalScrollIndicator={false}
                enableEmptySections={true}
                onEndReached = {this._onEndReached.bind(this)}
                onEndReachedThreshold = {30}
                dataSource={this.state.dataSource.cloneWithRows(this.state.itemList)}
                renderRow={(rowData,selectionId,rowId) => this.renderRow(rowData,rowId)}
            />
        );
    }
    componentWillMount () {
        this._onRefresh()
    }
    renderRow(rowData,rowId) {
        return (
            <View style={styles.cardStyle} key={rowId}>
                <NewsCard {...rowData}  goToCustomDetail={() => {this.goToCustomDetail(rowData)}}/>
            </View>
        )
    }
    // 刷新
    _onRefresh () {
        this.setState({
            isRefreshing: true,
            min_behot_time: Math.ceil(new Date().getTime() / 1000)
        })
        fetch(`https://m.toutiao.com/list/?tag=${this.props.channel}&ac=wap&count=20&format=json_raw&as=A1D5AA043D7D94C&cp=5A4DADE9042CAE1&min_behot_time=${this.state.min_behot_time}`, {
            headers: {
                "cookie": 'uuid="w:f398a72032874fb2926b46b30a842b50"; UM_distinctid=16095bf78e34e6-0f12df9526a8bc-1571466f-1fa400-16095bf78e436f; W2atIF=1; __tasessionId=uqnz69o931515050352436; bottom-banner-hide-status=true; tt_webid=6504044294067324430; csrftoken=91c907b5065f004c9a5e9c07522c584c; defaultSearchAction=toutiao; _ga=GA1.2.2065518468.1514340843; _gid=GA1.2.174609137.1515050351; _ba=BA0.2-20171127-51225-g6QpaEitS8cjDvOD3fMO;WEATHER_CITY=%E6%88%90%E9%83%BD'
            }
        })
            .then(response =>response.json())
            .then(response => {
                console.log(response.data)
                this.setState({
                    isRefreshing: false,
                    itemList: response.data
                })
            })
    }
    _onEndReached () {
        this.setState({
            max_behot_time: this.state.max_behot_time - parseInt(Math.random() * 60) * 60
        })
        fetch(`https://m.toutiao.com/list/?tag=${this.props.channel}&ac=wap&count=20&format=json_raw&as=A1D5AA043D7D94C&cp=5A4DADE9042CAE1&max_behot_time=${this.state.max_behot_time}`, {
            headers: {
                "cookie": 'uuid="w:cec8caafeb014d12a26847f813e2186d"; UM_distinctid=160c4d81def23f-0ee17c17e32fe-1571466f-1fa400-160c4d81df061e; W2atIF=1; bottom-banner-hide-status=true; csrftoken=3c7929b468ba61f2ae341124d9465b01; tt_webid=6507437848240719373; __tasessionId=smhdkoaxo1515141434823; _ga=GA1.2.1616622622.1515130987; _gid=GA1.2.1681465571.1515130987; _ba=BA0.2-20171127-51225-g6QpaEitS8cjDvOD3fMO'
            }
        }).then(response =>response.json())
            .then(response => {
                this.setState({
                    isRefreshing: false,
                    itemList: this.state.itemList.concat(response.data)
                })
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            })
    }
    // 跳转
    goToCustomDetail(data) {
        if(!this.props.goToCustomDetail) return;
        this.props.goToCustomDetail(data)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
