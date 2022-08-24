import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CreateEventButton = ({ navigation }) => {
	return (
		<View className='absolute bottom-10 w-full z-50 items-end -mx-6'>
			<TouchableOpacity>
				<AntDesign
					onPress={() => navigation.navigate('CreateEvent')}
					name='pluscircle'
					size={48}
					color='blue'
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CreateEventButton;
