import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
	StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Text, Button } from 'react-native-elements';

import React, { useLayoutEffect, useState } from 'react';

const CreateEventScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Events',
			title: 'New Event',
		});
	}, [navigation]);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<StatusBar style='dark' />
				<View>
					<Input
						placeholder='Event Name'
						type='text'
						value={eventTitle}
						onChangeText={(text) => setEventTitle(text)}
					/>
					<Input
						placeholder='Event Description'
						type='text'
						value={eventDescription}
						onChangeText={(text) => setEventDescription(text)}
					/>
					<Input
						placeholder='Select Date'
						type='text'
						value={eventDescription}
						onChangeText={(text) => setEventDescription(text)}
					/>
					<View style={{ width: 150 }}>
						{loading === true ? (
							<Button loading title='Create Event' />
						) : (
							<Button raised title='Create Event' />
						)}
					</View>
				</View>
				<View style={{ height: 100 }}></View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
		// alignItems: 'center',
		// // justifyContent: 'center',
	},
});

export default CreateEventScreen;
