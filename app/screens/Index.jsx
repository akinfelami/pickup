import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Settings from './Settings';
import Profile from './Profile';
import Explore from './Explore';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreateEventButton from '../components/CreateEventButton';
import CreateEventScreen from './CreateEventScreen';

const Index = ({ navigation }) => {
	const Tab = createBottomTabNavigator();

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
					tabBarLabel: 'CreateEvent',
					tabBarIcon: ({ color, size }) => (
						<TouchableOpacity>
							<Ionicons
								name='search'
								size={28}
								color={color}
								onPress={() => navigation.navigate('CreateEvent')}
							/>
						</TouchableOpacity>
					),
					tabBarButton: () => <CreateEventButton />,
				}}
				name='CreateEvent'
				component={CreateEventScreen}
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
