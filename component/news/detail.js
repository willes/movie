import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar,
    InteractionManager,
    ScrollView,
    ListView,
    PixelRatio,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {Header, Icon} from 'react-native-elements';
const  {width, height} = Dimensions.get('window');
export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor = '#8B91FE'
                />
                <Header
                    outerContainerStyles={{ backgroundColor: '#8B91FE' }}
                    leftComponent={
                        <TouchableOpacity onPress={()=>{ this.props.navigator.pop()}} activeOpacity={1}>
                        <View>
                            <Icon
                                size={30}
                                name='arrow-back'
                                color='#fff' />
                        </View>
                        </TouchableOpacity>
                            }
                    centerComponent={{ text: this.props.data.media_name, style: { color: '#fff',fontSize: 20 } }}
                />
                <ScrollView
                    contentContainerStyle={styles.mainStyle}
                >
                    {this.state.detail.content?
                        <View>
                        <Text style={{textAlign: 'left', fontSize: 20, color: '#000',marginVertical: 10}}>{this.props.data.title}</Text>
                        <HTMLView
                        value={this.state.detail.content}
                        renderNode={this.renderNode}
                        stylesheet={styles}
                        /></View>:null}
                </ScrollView>
            </View>
        );
    }
    componentWillMount () {
        InteractionManager.runAfterInteractions(() => {
            this.getDetail()
        });
    }
    renderNode (node, index, siblings, parent, defaultRenderer) {
        if (node.name === 'br') {
            return ''
        }
        if (node.name === 'img') {
            const a = node.attribs;
            var imgWidth = Number(a.img_width)
            var imgHeight = Number(a.img_height)
            return ( <Image key={index} style={{width:PixelRatio.getPixelSizeForLayoutSize(imgHeight * (width / imgWidth)), height: PixelRatio.getPixelSizeForLayoutSize(width)}} resizeMode={'contain'} source={{uri: a.src}}/> );
        }
    }

    getDetail () {
        fetch(`https://m.toutiao.com/i${this.props.data.group_id}/info/`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    detail:response.data
                })
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    mainStyle: {
        padding: 15
    },
    p: {
      color: '#333',
      fontSize: 17,
      lineHeight: 27,
      paddingVertical:3,
      textAlign: 'center'
    }
});
