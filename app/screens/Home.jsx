import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from './../constants';
import axios from 'axios';

const Home = ({ navigation }) => {
	let userData;

	const [username, setUsername] = useState('User');

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
			const response = await fetch(
				`${apiBaseUrl}/user/get/${auth.currentUser.uid}`,
				{ headers: { authorization: `Bearer ${token}` } }
			);
			userData = await response.json();
			setUsername(userData.displayName);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SafeAreaView className='flex-1'>
			<View className='pt-5 flex-row-reverse ml-5 items-center'>
				<TouchableOpacity onPress={signOutUser}>
					<Image
						source={require('../assets/pickup.png')}
						style={{ width: 70, height: 70 }}
					/>
				</TouchableOpacity>

				<Text h3>Hi {username}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Home;
