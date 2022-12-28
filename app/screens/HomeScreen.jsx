import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
	TextInput,
} from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { apiBaseUrl } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { EvilIcons } from '@expo/vector-icons';
import EventCards from '../components/Events';
import { Feather } from '@expo/vector-icons';
import Tabs from '../components/Tabs';

const Home = ({ navigation }) => {
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState('');
	const [search, setSearch] = useState('');

	const weekday = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const d = new Date();
	let currentMonth = month[d.getMonth()].toUpperCase();
	let currentDay = weekday[d.getDay()].toUpperCase();

	const signOutDialog = async () => {
		Alert.alert('Sign out', 'Are you sure you want to sign out?', [
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Sign out',
				onPress: () => {
					signOut(auth);
					navigation.replace('Login');
				},
			},
		]);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const token = await auth.currentUser.getIdToken();
			const uid = auth.currentUser.uid;
			const response = await fetch(`${apiBaseUrl}/user/get/${uid}`, {
				headers: { authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			setUserData(data);
			setUserName(data.displayName);
		} catch (err) {
			console.error(err);
		}
	};

	const searchSubmit = () => {
		console.log('Search');
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />

			<View style={styles.headerContainer}>
				<View className='flex-row items-center p-5'>
					<TouchableOpacity onPress={signOutDialog}>
						<Image
							source={require('../assets/profileimg.png')}
							style={{ width: 40, height: 40 }}
						/>
					</TouchableOpacity>
					<Text style={{ marginLeft: 10 }} h4>
						Hi{`, ${userName}`}
					</Text>
				</View>
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<Text>
						{currentDay}, {currentMonth} {d.getDate()}
					</Text>

					<Text h3 className='font-bold'>
						Upcoming Events
					</Text>
				</View>
			</View>

			<Tabs />

			<View style={styles.createEventButton}>
				<Button
					buttonStyle={{
						height: 60,
						width: 60,
						borderRadius: 100,
						backgroundColor: '#102e48',
					}}
					icon={<Feather name='plus' size={30} color='white' />}
					containerStyle={styles.button}
					onPress={() => navigation.navigate('CreateEvent')}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginBottom: 10,
	},
	createEventButton: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
});

export default Home;
