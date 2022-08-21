import { View, ScrollView } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import EventCard from '../components/EventCards';
import React from 'react';

const All = () => {
	return (
		<ScrollView className='pb-36'>
			<EventCard />
			<EventCard />
			<EventCard />
			<EventCard />
			<EventCard />
			<EventCard />
			<EventCard />
		</ScrollView>
	);
};

export default All;
