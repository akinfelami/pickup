import { StatusBar } from 'expo-status-bar';
import 'expo-dev-menu';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import EventDetails from './screens/EventDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './components/Tabs';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Index from './screens/Index';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: '#102e48' },
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white',
};

export default function App() {
	return (
		<NavigationContainer>
			<TailwindProvider>
				<Stack.Navigator
					style={{ backgroundColor: 'white' }}
					screenOptions={globalScreenOptions}>
					<Stack.Screen
						options={{ headerShown: false }}
						name='Welcome'
						component={WelcomeScreen}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name='Index'
						component={Index}
					/>

					<Stack.Screen name='CreateEvent' component={CreateEventScreen} />
					<Stack.Screen
						options={{
							presentation: 'modal',
							headerShown: true,
							headerStyle: { backgroundColor: 'white' },
							headerLeft: () => (
								<Button
									title='Done'
									type='clear'
									style={{ borderColor: '#102e48' }}
								/>
							),
						}}
						name='Profile'
						component={Profile}
					/>

					<Stack.Screen
						options={{ headerShown: false }}
						name='Login'
						component={LoginScreen}
					/>

					<Stack.Screen name='Register' component={RegisterScreen} />
				</Stack.Navigator>
			</TailwindProvider>
		</NavigationContainer>
	);
}
