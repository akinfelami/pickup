import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { apiBaseUrl } from '../constants';
import { auth } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Card from './Cards';
import Loading from './Loading';
import { LinearGradient } from 'expo-linear-gradient';

const EventCards = (navigation) => {
	const [data, setData] = useState({});

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	const fetchData = async () => {
		try {
			const token = await auth.currentUser.getIdToken();
			const response = await fetch(`${apiBaseUrl}/event/all`, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});

			const res = await response.json();
			setData(res);
		} catch (err) {
			console.error(err);
		}
	};

	// const DATA = null;

	const DATA = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			title: 'First Item',
		},
		{
			id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
			title: 'Second Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e29d72',
			title: 'Third Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e39d72',
			title: 'Fourth Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e344d72',
			title: 'Fifth Item',
		},
		{
			id: '58694a0f-3da1-34371f-bd96-145571e344d72',
			title: 'Sixth Item',
		},
		{
			id: '58644a0f-3da1-34371f-bd96-145571e344d72',
			title: 'Seventh Item',
		},
	];

	const renderItem = ({ item }) => <Card item={item} />;

	return (
		<>
			{DATA ? (
				<View className='pl-4 pr-4 mt-2' style={styles.container}>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</View>
			) : (
				<Loading />
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default EventCards;
