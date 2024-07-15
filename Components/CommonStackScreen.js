import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
const CommonStack = createStackNavigator();

const CommonStackScreen = () => (
  <CommonStack.Navigator screenOptions={{ headerShown: false }}>
    <CommonStack.Screen name="LoadingScreen" component={LoadingScreen} />
    <CommonStack.Screen name="LoginScreen" component={LoginScreen} />
  </CommonStack.Navigator>
);

export default CommonStackScreen;
