import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CreateEvent = ({ navigation }) => {
	return (
		<View className='absolute bottom-10 w-50 z-50 items-end'>
			<TouchableOpacity
				onPress={() => navigation.navigate('CreateEvent')}
				className='p-4 rounded-lg items-center space-x-1 mx-9 flex-row-reverse bg-slate-500'>
				<Text className='text-white flex-1 font-extrabold text-lg text-center'>
					Create Event
				</Text>
				<Ionicons color='red' name='create-outline' size={24} />
			</TouchableOpacity>
		</View>
	);
};

export default CreateEvent;
