import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState, Component } from 'react';
import { apiBaseUrl } from '../constants';
import Tabs from '../components/Tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Home = ({ route, navigation }) => {
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState('');

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
			// const data = await response.json();
			console.log(response);
			// setUserData(data);
			// setUserName(data.displayName);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SafeAreaView className='flex-1'>
			<StatusBar style='dark' />

			<View className='pt-5 flex-row-reverse ml-3 items-center'>
				<TouchableOpacity onPress={signOutUser}>
					<Image
						className='mr-2'
						source={require('../assets/profileimg.png')}
						style={{ width: 40, height: 40 }}
					/>
				</TouchableOpacity>
				{userName === '' ? (
					<Text className='mr-3' h4>
						Hi
					</Text>
				) : (
					<Text className='mr-3' h4>
						Hi, {userName}
					</Text>
				)}
			</View>
			<View className='ml-5 mb-8'>
				<Text h3 className='font-bold'>
					{' '}
					Your Events
				</Text>
			</View>
			<Tabs data={userData} />
			<View className='absolute bottom-10 w-full z-50 items-end -mx-6'>
				<TouchableOpacity>
					<AntDesign
						onPress={() => {
							navigation.navigate('CreateEvent', {
								otherParam: userData.id,
							});
						}}
						name='pluscircle'
						size={48}
						color='blue'
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Home;
