/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import Play from './play'
import HTMLView from 'react-native-htmlview';
import {Header, Icon, Button } from 'react-native-elements';
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoMovie: {
                movie: {},
                playUrls: []
            }
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <Header
                    outerContainerStyles={{ backgroundColor: '#1A1728',borderBottomColor: '#000' }}
                    leftComponent={
                        <TouchableOpacity onPress={()=>{}} activeOpacity={1}>
                            <View>
                                <Icon
                                    size={30}
                                    name='arrow-back'
                                    color='#fff' />
                            </View>
                        </TouchableOpacity>
                    }
                    centerComponent={{ text: '详情', style: { color: '#fff',fontSize: 20 } }}
                />
                <ScrollView>
                    {/*信息*/}
                    <View style={styles.coverInfo}>
                        <View style={styles.coverLeft}>
                            <Image source={{uri: `http://static.bd-dy.com/img/${this.state.infoMovie.movie.coverPic}`}} style={styles.coverPicStyle}/>
                        </View>
                        <View style={styles.coverRight}>
                            <Text style={styles.infoText} numberOfLines={1}>[ {this.filteTitle(this.state.infoMovie.movie.title)} ]</Text>
                            <Text style={styles.infoSubText}>{this.state.infoMovie.movie.summary}</Text>
                            <View>
                                <Button
                                    small
                                    outline
                                    fontSize={16}
                                    buttonStyle={styles.buttonStyle}
                                    onPress={()=>this.goToPlay()}
                                    title='播放' />
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentStyle}>
                        <HTMLView
                            value={this.state.infoMovie.movie.content}
                            renderNode={this.renderNode}
                            stylesheet={styles}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
    componentDidMount () {
        this.getMovieInfo()
    }
    getMovieInfo () {
        fetch(`http://bd-dy.com/app/movie/${this.props.data}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    infoMovie: response
                })
            })
    }
    filteTitle (str) {
        if (!str) return
        return str.substring(str.indexOf('《') + 1, str.indexOf('》'))
    }
    goToPlay () {
        var self = this;
        console.log(self.state.infoMovie)
        this.props.navigator.push({
            component: Play,
            params:{
                data: self.state.infoMovie.playUrls
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#1A1728'
    },
    coverInfo: {
      flexDirection: 'row',
      paddingVertical: 20,
      paddingHorizontal: 15,
      paddingBottom: 0
    },
    coverPicStyle: {
        width: 150,
        height:180,
        borderRadius: 5
    },
    infoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    infoSubText: {
      color: '#fff',
      fontSize: 15,
      lineHeight: 28
    },
    coverRight: {
        flex: 1,
        padding: 10
    },
    contentStyle: {
        padding: 15
    },
    p: {
        color:'#fff',
        lineHeight: 28,
        fontSize: 15
    },
    buttonStyle: {
        width: 80,
        height: 35,
        borderRadius: 5,
        marginTop: 68,
        marginLeft: -15,
        backgroundColor: '#000'
    }
});
