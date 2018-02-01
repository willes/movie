
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements'
var SearchBar = React.createClass({
    getDefaultProps(){
        return {
            title:'首页',
            desc: '每日精选视频推介,让你大开眼界'
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchTitle}>
                    <Text style={{fontSize:25,paddingVertical: 10, fontWeight:'bold',color:'#fff'}}>{this.props.title}</Text>
                    <Icon
                        type='evilicon'
                        name='search'
                        size={30}
                        color='#fff' />
                </View>
                <View>
                    <Text style={styles.subText}>{this.props.desc}</Text>
                </View>
            </View>
        );
    }
})

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#1F182A'
    },
    searchTitle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    subText: {
        fontSize: 15,
        color:'#fff'
    }
});

module.exports = SearchBar;
