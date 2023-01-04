import { SafeAreaView, Text } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { Image, Button } from 'react-native-elements';

const EventDetails = ({ route, navigation }) => {
	const data = route.params;

	useEffect(() => {
		console.log(data.title);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<Button
					title='Done'
					type='clear'
					onPress={() => navigation.navigate('Index')}
				/>
			),
			title: 'Event',
		});
	}, [navigation]);
	return (
		<SafeAreaView>
			<Text>Welcome</Text>
		</SafeAreaView>
	);
};

export default EventDetails;
