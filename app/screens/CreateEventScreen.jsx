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
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const CreateEventScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');

	const [datePicker, setDatePicker] = useState(false);

	const [date, setDate] = useState(new Date());

	const [timePicker, setTimePicker] = useState(false);

	const [time, setTime] = useState(new Date(Date.now()));
	time.setSeconds(0, 0);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	function showDatePicker() {
		setDatePicker(!datePicker);
		setTimePicker(false);
	}

	function showTimePicker() {
		setTimePicker(!timePicker);
		setDatePicker(false);
	}

	function onDateSelected(event, value) {
		setDate(value);
	}

	function onTimeSelected(event, value) {
		setTime(value);
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
					className='w-full'
					style={styles.container}
					behavior={Platform.OS === 'ios' ? 'padding' : null}>
					<StatusBar style='dark' />

					<View className='p-2'>
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
							placeholder='Address or Name of Location'
							type='text'
							value={eventDescription}
							onChangeText={(text) => setEventDescription(text)}
						/>

						<TouchableOpacity
							className='flex-row justify-between m-3'
							onPress={showDatePicker}>
							<View className='flex-row space-x-2 items-center'>
								<Fontisto name='date' size={24} color='black' />
								<Text className='text-lg'>Select Date </Text>
							</View>
							<Text className='text-lg'>{date.toDateString()}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className='flex-row justify-between m-3'
							onPress={showTimePicker}>
							<View className='flex-row space-x-2 items-center'>
								<Ionicons name='ios-time-outline' size={24} color='black' />
								<Text className='text-lg'>Select Time </Text>
							</View>

							<Text className='text-lg'>
								{time.toLocaleTimeString('en-US')}
							</Text>
						</TouchableOpacity>

						<View>
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
						</View>
						<TouchableOpacity
							className='flex-row justify-between m-3'
							onPress={undefined}>
							<View className='flex-row space-x-2 items-center'>
								<FontAwesome name='photo' size={24} color='black' />
								<Text className='text-lg'>Add Photo</Text>
							</View>
							<View className='flex-row space-x-1 items-center'>
								<Text className='text-lg'>Select Photo</Text>
								<Ionicons name='chevron-forward' size={32} color='black' />
							</View>
						</TouchableOpacity>
						<View style={{ width: 150, marginTop: 10 }}>
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
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		padding: 8,
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
