import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import { auth } from './../firebase';
import { signOut } from 'firebase/auth';
import React from 'react';

const Home = ({ navigation }) => {
	const signOutUser = async () => {
		try {
			await signOut(auth);
			navigation.replace('Login');
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

				<Text h4>Hi, User</Text>
			</View>
		</SafeAreaView>
	);
};

export default Home;
