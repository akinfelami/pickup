import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { apiBaseUrl } from '../constants';
import { auth } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Card from './Cards';
import Loading from './Loading';

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
	];

	const renderItem = ({ item }) => <Card item={item} />;

	return (
		<>
			<View className='ml-3 mt-5 px-3'>
				<StatusBar style='auto' />

				<View>
					{DATA ? (
						<FlatList
							data={DATA}
							renderItem={renderItem}
							keyExtractor={(item) => item.id}
						/>
					) : (
						<Loading />
					)}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({});

export default EventCards;
