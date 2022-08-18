import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from './../constants';

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
			<View className='pt-5 flex-row-reverse ml-3 items-center'>
				<TouchableOpacity onPress={signOutUser}>
					<Image
						source={require('../assets/pickup.png')}
						style={{ width: 50, height: 50 }}
					/>
				</TouchableOpacity>
				{userName === '' ? <Text h3>Hi</Text> : <Text h3>Hi, {userName}</Text>}
			</View>
		</SafeAreaView>
	);
};

export default Home;
