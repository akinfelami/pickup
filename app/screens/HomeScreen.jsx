import { View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import Tabs from '../components/Tabs';

const Home = ({ navigation }) => {
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
			const response = await fetch(
				`${apiBaseUrl}/user/get/${auth.currentUser.uid}`,
				{ headers: { authorization: `Bearer ${token}` } }
			);
			const data = await response.json();
			setUserData(data);
			setUserName(data.displayName);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SafeAreaView className='flex-1'>
			{/* <StatusBar backgroundColor='#0000' /> */}
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
			<View className='ml-5 mt-5 mb-8'>
				<Text h3 className='font-bold'>
					{' '}
					Your Events
				</Text>
			</View>
			<Tabs data={userData} />
		</SafeAreaView>
	);
};

export default Home;
