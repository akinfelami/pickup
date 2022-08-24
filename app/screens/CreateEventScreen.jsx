import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
	StyleSheet,
	Platform,
	ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useLayoutEffect, useState } from 'react';

const CreateEventScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');

	const [datePicker, setDatePicker] = useState(false);

	const [date, setDate] = useState(new Date());

	const [timePicker, setTimePicker] = useState(false);

	const [time, setTime] = useState(new Date(Date.now()));

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	function showDatePicker() {
		setDatePicker(!datePicker);
	}

	function showTimePicker() {
		setTimePicker(!timePicker);
	}

	function onDateSelected(event, value) {
		setDate(value);
		// setDatePicker(false);
	}

	function onTimeSelected(event, value) {
		setTime(value);
		// setTimePicker(false);
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Events',
			title: 'New Event',
		});
	}, [navigation]);

	return (
		<ScrollView>
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

						<Input
							placeholder='Address or Name of Location'
							type='text'
							value={eventDescription}
							onChangeText={(text) => setEventDescription(text)}
						/>
						<View>
							<Text style={StyleSheet.text}>Date = {date.toDateString()}</Text>

							<Text style={StyleSheet.text}>
								Time = {time.toLocaleTimeString('en-US')}
							</Text>

							{datePicker && (
								<DateTimePicker
									textColor='black'
									themeVariant='dark'
									value={date}
									mode={'date'}
									display={Platform.OS === 'ios' ? 'spinner' : 'default'}
									is24Hour={true}
									onChange={onDateSelected}
									style={StyleSheet.datePicker}
								/>
							)}

							{timePicker && (
								<DateTimePicker
									textColor='black'
									themeVariant='dark'
									value={time}
									mode={'time'}
									display={Platform.OS === 'ios' ? 'spinner' : 'default'}
									is24Hour={false}
									onChange={onTimeSelected}
									style={StyleSheet.datePicker}
								/>
							)}

							<View style={{ margin: 10 }}>
								<Button
									title='Show Date Picker'
									color='green'
									onPress={showDatePicker}
								/>
							</View>

							<View style={{ margin: 10 }}>
								<Button
									title='Show Time Picker'
									color='green'
									onPress={showTimePicker}
								/>
							</View>
						</View>
					</View>
					<View style={{ height: 100 }}></View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		padding: 8,
		// backgroundColor: 'white',
	},
	text: {
		fontSize: 25,
		color: 'red',
		padding: 3,
		marginBottom: 10,
		textAlign: 'center',
	},

	// Style for iOS ONLY...
	datePicker: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: 320,
		height: 260,
		display: 'flex',
	},
});

export default CreateEventScreen;
