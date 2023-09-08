import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ic_backIcon} from '../utils/images';

const PostItem = ({title, body}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={ic_backIcon}
        style={{
          marginRight: 8,
          transform: [{rotateY: '180deg'}],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: '90%',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PostItem;
