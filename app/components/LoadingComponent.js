import { SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import React from 'react';

const LoadingComponent = () => {
	return (
		<SafeAreaView className='flex-1 justify-center items-center h-screen'>
			<View className='flex-4'>
				<ActivityIndicator />
			</View>
		</SafeAreaView>
	);
};

export default LoadingComponent;
