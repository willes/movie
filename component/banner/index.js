import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth,slideHeights } from '../carousel/styles/SliderEntry.style';
import SliderEntry from '../carousel/components/SliderEntry';
import styles from '../carousel/styles/index.style';
import { ENTRIES1, ENTRIES2 } from '../carousel/static/entries';
export default class Banner extends Component {
    static defaultProps = {
        data: [],
    };
    getSlides (entries) {
        if (!entries) {
            return false;
        }
        return entries.map((entry, index) => {
            return (
                <SliderEntry
                    key={`carousel-entry-${index}`}
                    even={(index + 1) % 2 === 0}
                    goToCustomDetail={()=>this.cellClick(entry)}
                    {...entry}
                />
            );
        });
    }
    cellClick (data) {
        if(!this.props.goToCustomDetail) return;
        this.props.goToCustomDetail(data.data.content);
    }
    get example1 () {
        return (
            <View style={{flex:1}}>
                <Carousel
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    sliderHeight={slideHeights}
                    firstItem={1}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={1}
                    enableMomentum={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContainer}
                    showsHorizontalScrollIndicator={false}
                    snapOnAndroid={true}
                    autoplay={true}
                    removeClippedSubviews={false}
                >
                    { this.getSlides(this.props.data) }
                </Carousel>
            </View>
        );
    }

    get example2 () {
        return (
            <Carousel
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={2500}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContainer}
                showsHorizontalScrollIndicator={false}
                snapOnAndroid={true}
                removeClippedSubviews={false}
            >
                { this.getSlides(ENTRIES2) }
            </Carousel>
        );
    }

    render () {
        return (
            <View style={styles.container}>
                { this.example1 }
                {/*<ScrollView*/}
                    {/*style={styles.scrollview}*/}
                    {/*indicatorStyle={'white'}*/}
                    {/*scrollEventThrottle={200}*/}
                {/*>*/}
                    {/*<Text style={styles.title}>Example 1</Text>*/}
                    {/*<Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>*/}
                    {/*{ this.example1 }*/}
                    {/*<Text style={styles.title}>Example 2</Text>*/}
                    {/*<Text style={styles.subtitle}>Momentum | Autoplay</Text>*/}
                    {/*{ this.example2 }*/}
                {/*</ScrollView>*/}
            </View>
        );
    }
}