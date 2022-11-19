import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';

const EventDetails = ({ route, navigation }) => {
	const eventData = route.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Home',
			title: 'Your Event',
		});
	}, [navigation]);
	return (
		<View>
			<Text>{eventData.title}</Text>
		</View>
	);
};

export default EventDetails;
