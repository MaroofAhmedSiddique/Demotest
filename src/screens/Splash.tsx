import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {blue_theme} from '../utils';
import {splash_logo_icon} from '../utils/images';

const Splash = (props: any) => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      retrieveData();
    }, 1000);
  });
  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value === null) {
        navigation.replace('LoginScreen');
      } else {
        navigation.replace('TabNavigator');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={splash_logo_icon} style={styles.splashImage} />
      <ActivityIndicator size="large" color={blue_theme} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashImage: {width: 180, height: 180, margin: 30, borderRadius: 90},
});
