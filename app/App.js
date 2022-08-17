import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Welcome from './screens/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<TailwindProvider>
				<Stack.Navigator>
					<Stack.Screen
						options={{ headerShown: false }}
						name='Welcome'
						component={Welcome}
					/>
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Register' component={Register} />
					<Stack.Screen
						options={{ headerShown: false }}
						name='Home'
						component={Home}
					/>
				</Stack.Navigator>
			</TailwindProvider>
		</NavigationContainer>
	);
}
