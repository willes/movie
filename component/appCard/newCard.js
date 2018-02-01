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
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { Badge } from 'react-native-elements';
import { getDateDiff } from '../common'
const  {width, height} = Dimensions.get('window');
export default class NewCard extends Component {
    render() {
        const type = this.props.has_video ? 2 : 1
        switch (type) {
            case 1:
                return (
                    <TouchableHighlight onPress={()=>{this.cellClick(this.props)}} underlayColor={'#e9e9e9'}>
                    <View style={styles.container}>
                        <Text style={{padding: 10,fontSize:18,color:'#333',lineHeight: 28}} numberOfLines={2}>{this.props.title}</Text>
                        <View style={styles.cardContentStyle}>
                            {
                                this.props.image_list.map((l, i) => (
                                    <View style={styles.imageBox} key={i}>
                                        <Image source={{uri:l.url}} style={styles.imageStyle}/>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.cardFooterStyle}>
                            <Text style={styles.footerText}>{this.props.media_name}</Text>
                            <Text style={styles.footerText}>{this.props.repin_count}评论</Text>
                            <Text style={styles.footerText}>{getDateDiff(this.props.datetime)}</Text>
                        </View>
                    </View>
                    </TouchableHighlight>
                )
                break;
            case 2:
                return (
                    <TouchableHighlight onPress={()=>{this.cellClick(this.props)}} underlayColor={'#e9e9e9'}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row',paddingVertical:10}}>
                            <View style={{flex:1}}>
                                <Text style={{paddingHorizontal: 10,fontSize:18,color:'#333',lineHeight: 28}} numberOfLines={2}>{this.props.title}</Text>
                                <View style={styles.cardFooterStyle}>
                                    {/*<Badge*/}
                                        {/*value={this.props.label}*/}
                                        {/*containerStyle={{ backgroundColor: '#fff',borderColor: '#eeeeee',borderWidth:1,marginRight: 5}}*/}
                                        {/*textStyle={{ color: '#f00',fontSize:12 }}*/}
                                    {/*/>*/}
                                    <Text style={styles.footerText}>{this.props.media_name}</Text>
                                    <Text style={styles.footerText}>{this.props.repin_count}评论</Text>
                                </View>
                            </View>
                            {this.props.video_detail_info ?<View style={{marginRight: 5}}>
                                <Image source={{uri:this.props.video_detail_info.detail_video_large_image.url}} style={styles.imageStyle}/>
                            </View>:null}
                        </View>
                    </View>
                    </TouchableHighlight>
                )
        }
    }
    cellClick (data) {
        if(!this.props.goToCustomDetail) return;
        this.props.goToCustomDetail(data);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F7'
    },
    cardContentStyle: {
      flexDirection: 'row'
    },
    imageBox: {
        width: (width - 20) / 3,
        height: (width - 20) / 3 * 0.75,
        marginLeft: 5,
        backgroundColor: '#cecece'
    },
    imageStyle: {
        width: (width - 20) / 3,
        height: (width - 20) / 3 * 0.75,
    },
    cardFooterStyle: {
        flexDirection:'row',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        marginRight: 8
    }
});
