import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ic_backIcon} from '../utils/images';
import {SafeAreaView} from 'react-native-safe-area-context';

const PostDetailsScreen = ({route, navigation}) => {
  const {title, body, id, userId} = route.params.item;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={ic_backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <View style={styles.itemView}>
          <Text style={styles.itemPageText}>Item Page {id}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Title</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Body</Text>
          <Text style={styles.text}>{body}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 17,
    color: '#555',
    lineHeight: 24,
  },
  backIcon: {},
  headerView: {
    marginTop: 25,
  },
  itemPageText: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemView: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});

export default PostDetailsScreen;
