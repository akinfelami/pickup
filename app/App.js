import { StatusBar } from 'expo-status-bar';
import 'expo-dev-menu';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import EventDetails from './screens/EventDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './components/Tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<TailwindProvider>
				<Stack.Navigator style={{ backgroundColor: 'white' }}>
					<Stack.Screen
						options={{ headerShown: false }}
						name='Welcome'
						component={WelcomeScreen}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name='Login'
						component={LoginScreen}
					/>

					<Stack.Screen name='Register' component={RegisterScreen} />
					<Stack.Screen
						options={{ headerShown: false }}
						name='Home'
						component={HomeScreen}
					/>
					<Stack.Screen name='CreateEvent' component={CreateEventScreen} />
					<Stack.Screen name='EventDetails' component={EventDetails} />
				</Stack.Navigator>
			</TailwindProvider>
		</NavigationContainer>
	);
}
