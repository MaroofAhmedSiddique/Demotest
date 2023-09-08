import React, {useEffect, useState} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {blue_theme} from '../utils';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const UserProfileScreen = ({navigation}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        setUser(userData);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarView}>
        <Text style={styles.avatarText}>{user?.name.charAt(0)}</Text>
      </View>
      <Text style={styles.title}>{user?.fullName}</Text>
      <Text style={styles.subtitle}>Email: {user?.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: blue_theme,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarView: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: WINDOW_WIDTH + WINDOW_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  avatarText: {
    fontSize: WINDOW_WIDTH * 0.18,
    fontWeight: '600',
    color: blue_theme,
  },
});

export default UserProfileScreen;
