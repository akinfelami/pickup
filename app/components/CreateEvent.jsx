import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CreateEvent = ({ navigation }) => {
	return (
		<View className='absolute bottom-10 w-full 2-50'>
			<View className='mx-5 p-4 rounded-lg items-end space-x-1'>
				<Ionicons.Button
					name='create-outline'
					backgroundColor={null}
					onPress={console.log('pressed')}
					size={54}
					color='black'
				/>
			</View>
		</View>
	);
};

export default CreateEvent;
