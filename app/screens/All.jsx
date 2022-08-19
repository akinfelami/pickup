import { View, ScrollView } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import EventCard from '../components/EventCards';
import React from 'react';

const All = () => {
	return (
		<ScrollView>
			<EventCard />
		</ScrollView>
	);
};

export default All;
