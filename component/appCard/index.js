
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
    Image,
    View,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { Icon, Badge } from 'react-native-elements'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class AppCard extends Component {
    render() {
        const { header, content} = this.props.data;
        return (
            <TouchableHighlight onPress={()=>{this.cellClick(content)}}>
            <View style={styles.container}>
                {/*headre*/}
                <View style={styles.headerStyle}>
                    <View style={styles.headerLeftStyle}>
                        <Image source={{uri:content.data.author.icon}} style={styles.iconStyle}/>
                        <View>
                            {/*<Text style={{fontSize:16,color:'#EC393E',paddingBottom: 5}}>{this.relpaceTitle(content.data.author.name)}</Text>*/}
                            <Text numberOfLines = {1} style={{fontSize:15,color:'#fff'}}>{this.relpaceTitle(header.title)}</Text>
                        </View>
                    </View>
                    {/*<View style={styles.headerRightStyle}>*/}
                        {/*<Text>{getDateDiff(content.data.date)}</Text>*/}
                    {/*</View>*/}
                </View>

                {/*body*/}
                <View style={styles.cardBodyStyle}>
                    <View style={styles.cardTitleStyle}>
                        <Text numberOfLines = {1}  style={{fontSize:18,color:'#fff'}}>{this.relpaceTitle(content.data.title)}</Text>
                    </View>
                    <Image source={{uri: content.data.cover.feed}} resizeMode={'cover'} style={styles.cardImgStyle}/>
                </View>
                {/*footer*/}
                <View style={styles.footerStyle}>
                    <View style={styles.footerItem}>
                        <Icon
                        name='star'
                        type='evilicon'
                        color='#fff'
                        size={26}
                    />
                    <Text style={{color: '#fff'}}>{content.data.consumption.collectionCount}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Icon
                            name='external-link'
                            type='evilicon'
                            color='#fff'
                            size={26}
                        />
                        <Text style={{color: '#fff'}}>{content.data.consumption.shareCount}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Icon
                            name='comment'
                            type='evilicon'
                            color='#fff'
                            size={26}
                        />
                        <Text style={{color: '#fff'}}>{content.data.consumption.replyCount}</Text>
                    </View>
                </View>
            </View>
            </TouchableHighlight>

        );
    }
    relpaceTitle (value) {
        return value.replace(/(开眼)/g,'')
    }
    cellClick (data) {
        if(!this.props.goToCustomDetail) return;
        this.props.goToCustomDetail(data);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#1A1625'
    },
    cardImgStyle: {
        width: viewportWidth - 20,
        height: viewportHeight * 0.3,
        borderRadius: 8,
        marginBottom: 10
    },
    iconStyle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 10
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    headerLeftStyle: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRightStyle: {
        marginLeft: 50,
    },
    cardBodyStyle: {
        position: 'relative',
        width: viewportWidth - 20,
        height: viewportHeight * 0.3,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor:'#D2D1D1',
        elevation: 8,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5
    },
    cardTitleStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex:10,
      borderRadius: 8,
      backgroundColor: 'rgba(0,0,0,.3)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    footerStyle: {
        flex:1,
        flexDirection:'row'
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30
    }
});

