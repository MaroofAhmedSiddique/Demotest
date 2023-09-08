import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TodoItem = ({title, completed, index}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.index}>{index}.</Text>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Text style={completed ? styles.completedText : styles.inCompletedText}>
        {completed ? 'Completed ✅' : 'Incompleted'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    gap: 3,
  },
  subContainer: {
    marginVertical: 4,
    borderColor: '#ccc',
    flexDirection: 'row',
    gap: 3,
  },
  text: {
    fontSize: 18,
  },
  completedText: {
    fontSize: 18,
    color: 'green',
    marginHorizontal: 10,
  },
  inCompletedText: {
    fontSize: 18,
    color: '#888',
    marginHorizontal: 10,
  },
  index: {marginTop: 3},
});

export default TodoItem;
