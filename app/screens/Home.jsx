import { View, SafeAreaView } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';

import React from 'react';

const Home = () => {
	return (
		<SafeAreaView className='flex-1'>
			<View className='pt-5 flex-row-reverse ml-5 items-center'>
				<Image
					// source={require('../assets/pickup.png')}
					style={{ width: 70, height: 70 }}
				/>
				<Text h4>Hi, User</Text>
			</View>
		</SafeAreaView>
	);
};

export default Home;
