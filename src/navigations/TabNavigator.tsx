import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import {Image, View, Text} from 'react-native';
import HomeStackNavigation from './HomeStackNavigation';
import {blue_theme} from '../utils';
import {ic_homeIcon, ic_profileIcon} from '../utils/images';

const Bottom = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={ic_homeIcon}
                resizeMode="contain"
                style={{width: 25, tintColor: focused ? blue_theme : 'gray'}}
              />
            </View>
          ),
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? blue_theme : 'grey'}}>Home</Text>
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={ic_profileIcon}
                resizeMode="contain"
                style={{width: 25, tintColor: focused ? blue_theme : 'gray'}}
              />
            </View>
          ),
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? blue_theme : 'grey'}}>Profile</Text>
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default TabNavigator;
