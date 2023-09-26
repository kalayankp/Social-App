import React, { useState, useRef, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  Animated,
  Dimensions,
  StyleSheet,
  
} from 'react-native';
import { Appbar } from 'react-native-paper'; // import Appbar
import { FeedRow } from '../components/Reels/FeedRow';
import { data } from '../utils/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReelsScreen = () => {
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({ isViewable: true, index: 0 });
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };
  const { height } = Dimensions.get('window');
  const [rowHeight, setRowHeight] = useState(height);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const handleResize = () => {
      setRowHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleResize);
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const onViewableItemsChanged = useRef((viewableItems) => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = (index) => {
    const rowHeight = height * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [rowHeight, rowHeight + height / 2, rowHeight + height],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: rowHeight,
    offset: rowHeight * index,
    index,
  });

  const onEndReached = () => {};

  const keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  const renderItem = ({ item, index }) => {
    // console.log(item);
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
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Add top app bar */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Reels" />
      </Appbar.Header>

      <View style={styles.container}>
        <Animated.FlatList
          pagingEnabled
          showsVerticalScrollIndicator={false}
          ref={refFlatList}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
  },
});