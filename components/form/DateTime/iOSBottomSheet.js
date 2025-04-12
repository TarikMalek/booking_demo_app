import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const { height } = Dimensions.get('window');

const AnimatedBottomSheet = ({
  visible,
  onClose,
  value,
  mode = 'date',
  SetDate,
  minimumValue,
  maximumValue,
  minuteInterval,
}) => {
  const translateY = useRef(new Animated.Value(height)).current;

  // Animate sheet in or out when `visible` changes
  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <View />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>✕</Text>
        </TouchableOpacity>

        <DateTimePicker
          testID="dateTimePicker"
          value={value ?? new Date()}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={(event, date) => {
            if (date) {
              console.log('date', date);
              SetDate(date);
              onClose(); // hide on success
            }
          }}
          minimumDate={minimumValue}
          maximumDate={maximumValue}
          minuteInterval={minuteInterval}
        />
      </Animated.View>
    </Modal>
  );
};

export default AnimatedBottomSheet;

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    alignItems : 'center',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1,
  },
});
