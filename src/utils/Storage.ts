import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserData = async data => {
  try {
    await AsyncStorage.setItem('user_data', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
