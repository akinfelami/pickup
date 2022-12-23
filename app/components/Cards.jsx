import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const Cards = ({ item }) => {
	return (
		<View>
			<TouchableOpacity style={[styles.card, styles.shadowProp]}>
				<Text
					style={{ fontSize: '20px' }}
					className='font-bold text-lg text-gray-700'>
					{item.title}
				</Text>
				<Text style={{ fontSize: '20px' }} className='font-bold text-lg mt-2'>
					Title
				</Text>
				<Text className='text-lg'>Leadner Soccer/Futbol/Footbal/Funchibol</Text>
				<View className='flex-row items-center space-x-2'>
					<View>
						<Text className='text-lg mr-20'>12 going · location</Text>
					</View>
					<Feather name='bookmark' size={20} color='grey' />
					<Feather name='share' size={20} color='grey' />
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 15,
		backgroundColor: 'white',
		paddingVertical: 20,
		paddingHorizontal: 20,
		width: '100%',
		marginVertical: 10,
	},
	shadowProp: {
		// shadowColor: '#171717',
		// shadowOffset: { width: -2, height: 4 },
		// shadowOpacity: 0.2,
		// shadowRadius: 15,
	},
});

export default Cards;
