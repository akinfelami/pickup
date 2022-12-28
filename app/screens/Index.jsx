import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Explore from './Explore';
import { Ionicons } from '@expo/vector-icons';

const Index = ({ navigation }) => {
	const Tab = createBottomTabNavigator();
	const [search, setSearch] = useState('');

	const searchSubmit = () => {
		console.log('Search');
	};

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#102e48',
				// tabBarInactiveTintColor: 'black',
				tabBarStyle: {
					padding: 5,
				},
				headerShown: false,
				tabBarShowLabel: false,
			}}>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<TouchableOpacity>
							<Ionicons
								name='home'
								size={28}
								color={color}
								onPress={() => navigation.navigate('Home')}
							/>
						</TouchableOpacity>
					),
				}}
				name='Home'
				component={HomeScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: true,

					tabBarLabel: 'Explore',
					tabBarIcon: ({ color, size }) => (
						<TouchableOpacity>
							<Ionicons
								name='search'
								size={28}
								color={color}
								onPress={() => navigation.navigate('Explore')}
							/>
						</TouchableOpacity>
					),
				}}
				name='Explore'
				component={Explore}
			/>

			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<TouchableOpacity>
							<Ionicons
								name='person'
								size={28}
								color={color}
								onPress={() => navigation.navigate('Profile')}
							/>
						</TouchableOpacity>
					),
				}}
				name='Profile'
				component={Profile}
			/>
		</Tab.Navigator>
	);
};

export default Index;

const styles = StyleSheet.create({});
