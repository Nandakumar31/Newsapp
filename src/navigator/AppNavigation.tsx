import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splashscreen';
import SearchScreen from '../screens/SearchScreen';
import Login from '../screens/Auth/Login';
import Otp from '../screens/Auth/Otp';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />

      <Stack.Screen name="Dashboard" component={SearchScreen} />

    </Stack.Navigator>
  );
}
