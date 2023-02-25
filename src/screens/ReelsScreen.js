import React, {useState, useRef, useContext} from 'react';
import {View, Animated} from 'react-native';
import {FeedRow} from '../components/Reels/FeedRow';
// import {AppContext} from '../Context';
// import CommonStyle from '../Theme/CommonStyle';
// import {height, isIOS} from '../Utils/Constant';
import {data} from '../utils/data';
import metrics from '../contents/metrics';
import Header from '../components/Search/Header';
import ShareButton from '../components/Reels/ShareButton';
const ReelsScreen = () => {
  const contentToShare = 'Check out this cool thing I found!';
  //   const {displayHeight, setDisplayHeight} = useContext(AppContext);
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};
  const onViewableItemsChanged = useRef(viewableItems => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = index => {
    const rowHeight = metrics.height * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + metrics.height / 2,
          rowHeight + metrics.height,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: metrics.height,
    offset: metrics.height * index,
    index,
  });

  //   const onLayout = ({nativeEvent}) => {
  //     setDisplayHeight((!isIOS && nativeEvent.layout.height) || height);
  //   };

  const onEndReached = () => {
    // make api call here
  };

  const keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  const renderItem = ({item, index}) => {
    console.log(item);
    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        index={index}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        isVisible={scrollIndex === index}
      />
    );
  };

  return (
    <>
    <View>
      <Header/>
    </View>
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={20}
        onEndReached={onEndReached}
        removeClippedSubviews={true}
      />
    </View>
    <View style={{ position: 'absolute', bottom: 30, right: 15 }}>
        <ShareButton contentToShare={contentToShare} />
      </View>
    </>
  );
};

export default ReelsScreen;
