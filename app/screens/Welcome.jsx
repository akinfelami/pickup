import { SafeAreaView, View } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import React, { useEffect } from 'react';

const Welcome = ({ navigation }) => {
	useEffect(() => {
		if (auth.currentUser) {
			navigation.replace('Home');
		} else {
			navigation.replace('Login');
		}
	}, []);

	return (
		<SafeAreaView className='flex-1 justify-center items-center h-screen'>
			<View className='flex-4'>
				<Image
					source={require('../assets/pickup.png')}
					style={{ width: 200, height: 200 }}
				/>
				{/* Commented out code used for testing */}
				{/* <Button
					title='Login'
					onPress={() => navigation.replace('Login')}></Button> */}
			</View>
		</SafeAreaView>
	);
};

export default Welcome;
