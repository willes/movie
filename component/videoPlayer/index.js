
import React, {
    Component
} from 'react';

import {
    AppRegistry, Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Icon, Slider} from 'react-native-elements'
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import Orientation from 'react-native-orientation';
import { formatSeconds } from '../common'
var Spinner = require('react-native-spinkit');
let timer = null
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class VideoPlayer extends Component {

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: '00:00',
        currentTime: '00:00',
        paused: false,
        showControl:false,
        isVisible:false,
        isFullScreen: false
    };

    video: Video;
    componentDidMount() {

    }
    playControlDisplay() {
        if(this.state.isVisible) return
        clearTimeout(timer)
        this.setState({
            showControl:!this.state.showControl
        })
        timer = setTimeout(()=>{
            this.setState({
                showControl:false
            })
        },5000)
    }
    onLoad = (data) => {
        this.setState({ duration: data.duration,isVisible: false,showControl:true});
        timer = setTimeout(()=>{
            clearTimeout(timer)
            this.setState({
                showControl:false
            })
        },5000)
    };
    onLoadStart = () => {
        this.setState({ isVisible: true,showControl:false });
    }
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime});
    };

    onEnd = () => {
        this.setState({ paused: true,showControl:true })
        this.player.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }
    onBuffer (value) {
        console.log(value)
    }
    fullscreenPlayer() {
        if (this.props.callback) {
            this.props.callback()
            return
        }
       Orientation.getOrientation(function (err, orientation) {
           if (orientation === 'PORTRAIT') {
               Orientation.lockToLandscapeLeft();
           } else {
               Orientation.lockToPortrait();
               // do something else
           }
        });
        // console.log(initial)
        // if (initial === 'PORTRAIT') {
        //     Orientation.lockToLandscapeLeft();
        // } else {
        //     Orientation.lockToPortrait();
        //     // do something else
        // }
    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fullScreen}
                    onPress={()=>this.playControlDisplay()}
                >
                    <Video
                        ref={(ref) => {
                            this.player = ref
                        }}
                        /* For ExoPlayer */
                        /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
                        source={{uri: this.props.url}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        fullscreen={true}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onBuffer={this.onBuffer}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                    {/*control*/}
                    {!this.state.isVisible?<Animatable.View animation={this.state.showControl?'fadeIn':'fadeOut'} easing='ease-in' direction='normal' duration={100} style={styles.controlPlay}>
                        <TouchableOpacity
                            style={styles.playBtn}
                            onPress={() => this.setState({ paused: !this.state.paused })}>
                            <Icon
                                name={this.state.paused?'ios-play':'ios-pause'}
                                type='ionicon'
                                size={30}
                                color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.callback()}} style={styles.backStyle}>
                            <Icon
                                name='chevron-left'
                                type='EvilIcon'
                                color='#fff'
                                size={30}
                            />
                        </TouchableOpacity>
                    </Animatable.View>:null}
                </TouchableOpacity>
                <View style={styles.controlPlay}>
                    <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={'FadingCircleAlt'} color={'#ffffff'}/>
                </View>
                {this.state.showControl? <View animation={this.state.showControl?'fadeIn':'fadeOut'} direction='normal' duration={100} easing='ease-in' style={styles.controls}>
                    {/*<View style={styles.generalControls}>*/}
                    {/*<View style={styles.rateControl}>*/}
                    {/*{this.renderRateControl(0.25)}*/}
                    {/*{this.renderRateControl(0.5)}*/}
                    {/*{this.renderRateControl(1.0)}*/}
                    {/*{this.renderRateControl(1.5)}*/}
                    {/*{this.renderRateControl(2.0)}*/}
                    {/*</View>*/}

                    {/*<View style={styles.volumeControl}>*/}
                    {/*{this.renderVolumeControl(0.5)}*/}
                    {/*{this.renderVolumeControl(1)}*/}
                    {/*{this.renderVolumeControl(1.5)}*/}
                    {/*</View>*/}

                    {/*<View style={styles.resizeModeControl}>*/}
                    {/*{this.renderResizeModeControl('cover')}*/}
                    {/*{this.renderResizeModeControl('contain')}*/}
                    {/*{this.renderResizeModeControl('stretch')}*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <View style={styles.trackingControls}>
                        <Text style={styles.timer}>{formatSeconds(this.state.currentTime)}</Text>
                        <View style={styles.progress}>
                            {/*<View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />*/}
                            {/*<View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />*/}
                            <View  style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                                <Slider
                                    thumbTintColor={'#fff'}
                                    minimumTrackTintColor={'#8B91FE'}
                                    trackStyle={{backgroundColor:'#fff'}}
                                    thumbStyle={{backgroundColor:'#8B91FE',width:12,height:12}}
                                    value={this.getCurrentTimePercentage()}
                                    onValueChange={(value) => {
                                        this.player.seek(value * this.state.duration)
                                    }}
                                />
                            </View>
                        </View>
                        <Text style={styles.timer}>{formatSeconds(this.state.duration)}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{marginLeft:6}}
                            onPress={()=>this.fullscreenPlayer()}>
                            <Icon
                                name='md-expand'
                                type='ionicon'
                                size={20}
                                color='#fff'
                            />
                        </TouchableOpacity>
                    </View>
                </View>:null}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        // transform:([{ rotateX: '45deg' }])
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 5,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        position:'relative',
        flexDirection: 'row',
        borderRadius: 3,
        marginHorizontal: 5
    },
    innerProgressCompleted: {
        height: 4,
        zIndex: 12,
        backgroundColor: '#8B91FE',
    },
    innerProgressRemaining: {
        height: 4,
        backgroundColor: '#fff',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    trackingControls: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    timer: {
        color: '#fff'
    },
    controlPlay: {
        position:'absolute',
        left:0,
        right: 0,
        bottom:0,
        top:0,
        justifyContent:'center',
        alignItems: 'center'
    },
    playBtn:{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,.6)'
    },
    backStyle: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex:10,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,.6)'
    }
});
