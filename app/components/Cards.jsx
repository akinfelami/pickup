import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const Cards = ({ item }) => {
	return (
		<View>
			<TouchableOpacity>
				<Text
					style={{ fontSize: '20px' }}
					className='font-bold text-lg text-gray-700'>
					{item.title}
				</Text>
				<Text style={{ fontSize: '20px' }} className='font-bold text-lg mt-2'>
					Title
				</Text>
				<Text className='text-lg'>Leadner Soccer/Futbol/Footbal/Funchibol</Text>
				<View className='mt-2 mb-2 flex-row items-center space-x-2'>
					<View>
						<Text className='text-lg mr-20'>12 going · location</Text>
					</View>
					<Feather name='bookmark' size={20} color='grey' />
					<Feather name='share' size={20} color='grey' />
				</View>
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
						marginBottom: 5,
						marginTop: 5,
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({});
