import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const slideHeights = slideHeight;
const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingVertical: 8, // needed for shadow
        zIndex:10
    },
    imageContainer: {
        flex: 1,
        elevation: 8,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    // radiusMask: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     height: entryBorderRadius,
    //     backgroundColor: 'white'
    // },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 5,
        color: '#fff',
        fontSize: 12
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});