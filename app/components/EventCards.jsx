import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { apiBaseUrl } from '../constants';
import { auth } from '../firebase';

import React, { useEffect, useState } from 'react';

const EventCards = (navigation) => {
	const [data, setData] = useState({});

	useEffect(() => {
		fetchData();
	}, [navigation]);

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
			EachCard(res);
			
		} catch (err) {
			console.error(err);
		}
	};

	const EachCard = (res) => {
		console.log(res)
		// res.map((dat) => {
		// 	return (
		// 		<View>
		// 			<Text>Hi</Text>
		// 		</View>
		// 	);
		};
	};

	return (
		<>
			<View className='ml-3 mt-5 px-3'>
				<TouchableOpacity>
					<EachCard />
					{/* <View>
						<Text
							style={{ fontSize: '20px' }}
							className='font-bold text-lg text-gray-700'>
							Date
						</Text>
						<Text
							style={{ fontSize: '20px' }}
							className='font-bold text-lg mt-2'>
							Title
						</Text>
						<Text className='text-lg'>
							Leadner Soccer/Futbol/Footbal/Funchibol
						</Text>
						<View className='mt-2 mb-2 flex-row items-center space-x-2'>
							<View>
								<Text className='text-lg mr-20'>12 going · location</Text>
							</View>
							<Feather name='bookmark' size={20} color='grey' />
							<Feather name='share' size={20} color='grey' />
						</View>
					</View> */}
				</TouchableOpacity>
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
			</View>
		</>
	);
};

export default EventCards;
