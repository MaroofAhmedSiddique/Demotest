import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ic_radio_check, ic_radio_uncheck} from '../utils/images';

const BottomSheetPopUp = ({hideMe, selectedList, onSelect}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '35%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    [],
  );
  const isSelected = (type: string) => {
    if (selectedList === type) {
      return true;
    }
    return false;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onSelect('todos');
          }}>
          <Image
            source={isSelected('todos') ? ic_radio_check : ic_radio_uncheck}
            style={styles.checkIcon}
          />
          <Text style={styles.itemText}>Todos List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            onSelect('posts');
          }}>
          <Image
            source={isSelected('posts') ? ic_radio_check : ic_radio_uncheck}
            style={styles.checkIcon}
          />
          <Text style={styles.itemText}>Posts List</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetPopUp;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  btnContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkIcon: {
    width: 28,
    height: 28,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
