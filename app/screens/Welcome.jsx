import { SafeAreaView, View } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import React, { useEffect } from 'react';

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
			<View className='flex-4'>
				<Image
					source={{
						uri: 'https://firebasestorage.googleapis.com/v0/b/cornell-pickup.appspot.com/o/pickup.png?alt=media&token=511330b4-fa98-4dc6-aefe-4a4cda2e77ef',
					}}
					style={{ width: 200, height: 200 }}
				/>
				{/* Commented out code used for testing */}
				<Button
					title='Login'
					onPress={() => navigation.replace('Login')}></Button>
			</View>
		</SafeAreaView>
	);
};

export default Welcome;
