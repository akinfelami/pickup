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
import Tabs from '../components/Tabs';
import { StatusBar } from 'expo-status-bar';

import { EvilIcons } from '@expo/vector-icons';

const Home = ({ route, navigation }) => {
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
					signOutUser;
				},
			},
		]);
	};

	const signOutUser = async () => {
		try {
			await signOut(auth);
			navigation.replace('Login');
		} catch (err) {
			console.error(err);
		}
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
			<ScrollView>
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

						{/* Search  */}
						<View className='flex-row items-center space-x-2 pt-5'>
							<View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
								<EvilIcons name='search' size={24} color='black' />
								<TextInput
									autoCapitalize='none'
									// value={search}
									onChangeText={(text) => setSearch(text)}
									keyboardType='default'
									blurOnSubmit={true}
									onSubmitEditing={searchSubmit}
									placeholder='Search'
									returnKeyType='search'
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
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
});

export default Home;
