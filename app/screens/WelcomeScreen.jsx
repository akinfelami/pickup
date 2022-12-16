import { SafeAreaView, View } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

import React, { useEffect, useState } from 'react';

const Welcome = ({ navigation }) => {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				navigation.replace('Home');
			} else {
				navigation.replace('Login');
			}
		});
		return unsubscribe;
	}, []);

	return (
		<SafeAreaView className='flex-1 justify-center items-center h-screen'>
			<StatusBar style='dark' />
			<View className='flex-4'>
				<Image
					source={require('../assets/pickup.png')}
					style={{ width: 200, height: 200 }}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Welcome;
