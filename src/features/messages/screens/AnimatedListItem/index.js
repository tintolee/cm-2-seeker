// Animations defined for the list of chatRooms
// Pass the UserItem component on line 63 in the animated view
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from 'react-native-eva-icons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {User1, User2, User3, User4, User5} from '../../customData.json';
import UserItem from '../chatRoom/components/UserItem';
import SearchBar from '../../../discover/screens/Search/components/SearchBar';
import chatListItem from '../chatRoom/chatListItem';

const COLORS = {
  red: '#cc0000',
  green: '#4cA64c',
  blue: '#4c4cff',
  white: '#fff',
  grey: '#ddd',
  orange: '#f59532',
};

const hapticFeedbackOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const VisibleItem = (props) => {
  const {data, screenWidth, rowKey} = props;

  return (
    <TouchableWithoutFeedback onPress={() => console.log('touched')}>
      <Animated.View
        style={[
          styles.rowFront,
          {
            height: rowAnimatedValues[rowKey].rowHeight,
            transform: [
              {
                translateX: rowAnimatedValues[
                  rowKey
                ].rowFrontTranslate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-screenWidth, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {/* <UserItem /> */}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const HiddenItemWithActions = (props) => {
  const {
    leftActionActivated,
    rightActionActivated,
    swipeAnimatedValue,
    onClose,
    onDelete,
    rowKey,
  } = props;

  if (rightActionActivated) {
    ReactNativeHapticFeedback.trigger('impactLight', hapticFeedbackOptions);
    Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
      toValue: Math.abs(swipeAnimatedValue.__getValue()),
      duration: 250,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
      toValue: 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View
      style={[styles.rowBack, {height: rowAnimatedValues[rowKey].rowHeight}]}>
      {!leftActionActivated && (
        <TouchableWithoutFeedback onPress={onDelete}>
          <Animated.View
            style={[
              styles.backBtn,
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                width: rowAnimatedValues[rowKey].rowBackWidth,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [-200, -120, 0],
                      outputRange: [0, 40, 100],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.backBtnInner}>
              <Icon name="trash-2-outline" fill="#fff" width={26} height={26} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

const rowAnimatedValues = {};
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowAnimatedValues[`${i}`] = {
      rowHeight: new Animated.Value(60),
      rowFrontTranslate: new Animated.Value(1),
      rowBackWidth: new Animated.Value(100),
    };
  });

const ListItem = () => {
  const {width: screenWidth} = useWindowDimensions();

  const [list, setList] = useState(
    [...new Array(10)].map((_, i) => ({
      key: `${i}`,
      text: `Item # ${i}`,
    })),
  );

  const deleteRow = (rowKey) => {
    const newData = list.filter((item) => item.key !== rowKey);
    setList(newData);
  };

  const onDelete = (rowKey) => {
    Animated.timing(rowAnimatedValues[rowKey].rowFrontTranslate, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
      toValue: screenWidth + 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
      toValue: 0,
      delay: 200,
      duration: 200,
      useNativeDriver: false,
    }).start(() => deleteRow(rowKey));
  };

  const swipeGestureEnded = (rowKey, data) => {
    if (data.translateX < -200) {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: screenWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
        toValue: 0,
        delay: 200,
        duration: 200,
        useNativeDriver: false,
      }).start(() => deleteRow(rowKey));
    }
  };

  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem
        data={data}
        rowKey={data.item.key}
        screenWidth={screenWidth}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HiddenItemWithActions
      data={data}
      rowMap={rowMap}
      rowKey={data.item.key}
      onClose={() => closeRow(rowMap, data.item.key)}
      onDelete={() => onDelete(data.item.key)}
    />
  );

  return (
    <SafeAreaView>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={60}
        rightOpenValue={-120}
        stopLeftSwipe={100}
        stopRightSwipe={-201}
        rightActivationValue={-200}
        rightActionValue={-screenWidth}
        swipeGestureEnded={swipeGestureEnded}
        swipeToOpenPercent={10}
        swipeToClosePercent={10}
        useNativeDriver={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  backLeftBtn: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.green,
    paddingRight: 16,
  },
  backRightBtn: {
    right: 0,
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  backRightBtnLeft: {
    backgroundColor: COLORS.blue,
  },
  backRightBtnRight: {
    backgroundColor: COLORS.orange,
  },
  backBtnInner: {
    alignItems: 'center',
  },
  backBtnText: {
    color: COLORS.white,
    marginTop: 2,
  },
});

export default ListItem;
