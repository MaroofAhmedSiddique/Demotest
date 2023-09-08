import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  View,
  Image,
} from 'react-native';
import {blue_theme, getTimeBasedGreeting} from '../utils';
import BottomSheetPopUp from '../components/BottomSheetPopUp';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../redux/slice/TodosSlice';
import TodoItem from '../components/TodoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import PostItem from '../components/PostItem';
import {fetchPosts} from '../redux/slice/PostsSlice';
import {ic_exchange} from '../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [ShowBottomSheetPopUp, setShowBottomSheetPopUp] = useState(true);
  const [selectedList, setSelectedList] = useState('todos');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const todosData = useSelector(state => state?.todos);
  const postaData = useSelector(state => state?.posts);
  useEffect(() => {
    getList();
    loadUserData();
  }, [selectedList]);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserName(userData.name);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const getList = () => {
    if (selectedList === 'todos') {
      dispatch(fetchTodos());
    } else {
      dispatch(fetchPosts());
    }
  };

  const renderTodos = ({item, index}) => {
    return (
      <TodoItem title={item.title} completed={item.completed} index={item.id} />
    );
  };

  const renderPosts = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PostDetailsScreen', {
            item,
          })
        }>
        <PostItem title={item.title} body={item.body} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{getTimeBasedGreeting(userName)}</Text>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {selectedList === 'todos' ? 'Todos' : 'Posts'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowBottomSheetPopUp(true);
          }}>
          <Image source={ic_exchange} style={styles.toggleIcon} />
        </TouchableOpacity>
      </View>
      {selectedList === 'todos' && (
        <FlatList
          data={todosData.data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTodos}
        />
      )}
      {selectedList === 'posts' && (
        <FlatList
          data={postaData.data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPosts}
        />
      )}
      {ShowBottomSheetPopUp && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowBottomSheetPopUp(false);
          }}>
          {ShowBottomSheetPopUp && (
            <Modal visible={ShowBottomSheetPopUp} transparent>
              <BottomSheetPopUp
                hideMe={() => {
                  setShowBottomSheetPopUp(false);
                }}
                selectedList={selectedList}
                onSelect={val => {
                  setSelectedList(val);
                  setShowBottomSheetPopUp(false);
                }}
              />
            </Modal>
          )}
        </TouchableWithoutFeedback>
      )}

      {(todosData.isLoader || postaData.isLoader) && <LoadingSpinner />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    marginBottom: 15,
    marginTop: 5,
    textAlign: 'center',
    color: blue_theme,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 6,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerView: {
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleIcon: {width: 25, height: 25},
});

export default HomeScreen;
