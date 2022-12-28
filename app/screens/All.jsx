import { View, ScrollView } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import EventCards from '../components/Events';

import React from 'react';

const All = () => {
	return (
		<ScrollView>
			<EventCards />
		</ScrollView>
	);
};

export default All;
