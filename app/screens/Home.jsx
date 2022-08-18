import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { apiBaseUrl } from './../constants';

const Home = ({ navigation }) => {
	let userData;

	const signOutUser = async () => {
		try {
			await signOut(auth);
			navigation.replace('Login');
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(async () => {
		try {
			const token = auth.currentUser.getIdToken();
			const response = await fetch(
				`${apiBaseUrl}/user/get/${auth.currentUser.uid}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			userData = await response.json();
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<SafeAreaView className='flex-1'>
			<View className='pt-5 flex-row-reverse ml-5 items-center'>
				<TouchableOpacity onPress={signOutUser}>
					<Image
						source={require('../assets/pickup.png')}
						style={{ width: 70, height: 70 }}
					/>
				</TouchableOpacity>
				<View>
					{userData === undefined ? (
						<Text h4>Hi, User!</Text>
					) : (
						<Text h4>Hi, {userData.displayName}</Text>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
