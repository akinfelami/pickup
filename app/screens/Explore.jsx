import { StyleSheet, Text, SafeAreaView, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';

const Explore = () => {
	const [search, setSearch] = useState('');

	const searchSubmit = () => {
		console.log('Search');
	};

	return (
		<SafeAreaView>
			{/* Search  */}
			<TextInput
				style={{
					borderRadius: 10,
					height: 40,
					padding: 10,
					margin: 10,
				}}
				className='bg-gray-200'
				autoCapitalize='none'
				value={search}
				onChangeText={(text) => setSearch(text)}
				keyboardType='default'
				onSubmitEditing={searchSubmit}
				placeholder='search upcoming events'
				returnKeyType='search'
			/>
		</SafeAreaView>
	);
};

export default Explore;

const styles = StyleSheet.create({
	// 	searchSection: {
	// 		flexDirection: 'row',
	//  	},
});
