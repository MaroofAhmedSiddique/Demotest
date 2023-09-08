import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostdetailScreen';

const Stack = createNativeStackNavigator();

function HomeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetailsScreen"
        component={PostDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigation;
