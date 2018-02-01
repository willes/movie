import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {
    render () {
        const header  = this.props.data.header
        const content = this.props.data.content.data
        const even = null
        const uppercaseTitle = header.title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{header.title.toUpperCase() }</Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => {this.cellClick()}}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri:  content.cover.feed }}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        { uppercaseTitle }
                        <Text style={styles.subtitle} numberOfLines={1}>{ header.description }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    cellClick (data) {
        if(!this.props.goToCustomDetail) return;
        this.props.goToCustomDetail();
    }
}