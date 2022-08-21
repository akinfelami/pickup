import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

import React from 'react';

const EventCards = () => {
	return (
		<View className='ml-3 mt-5 px-3'>
			<TouchableOpacity>
				<View>
					<Text
						style={{ fontSize: '20px' }}
						className='font-bold text-lg text-gray-700'>
						SAT, AUG 20 · 8:00 AM CDT{' '}
					</Text>
					<Text style={{ fontSize: '20px' }} className='font-bold text-lg mt-2'>
						7v7 CO-ed Soccer Pick up
					</Text>
					<Text className='text-lg'>
						Leadner Soccer/Futbol/Footbal/Funchibol
					</Text>
					<View className='mt-2 mb-2 flex-row items-center space-x-2'>
						<View>
							<Text className='text-lg mr-20'>12 going · Jessup Field</Text>
						</View>
						<Feather name='bookmark' size={20} color='grey' />
						<Feather name='share' size={20} color='grey' />
					</View>
				</View>
			</TouchableOpacity>
			<View
				style={{
					borderBottomColor: 'black',
					borderBottomWidth: StyleSheet.hairlineWidth,
				}}
			/>
		</View>
	);
};

export default EventCards;
