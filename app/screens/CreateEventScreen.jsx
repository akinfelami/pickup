import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
	StyleSheet,
	Platform,
	ScrollView,
	TextInput,
	SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiBaseUrl } from '../constants';
import React, { useLayoutEffect, useState } from 'react';
import { auth } from '../firebase';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';

const CreateEventScreen = ({ route, navigation }) => {
	const { otherParam } = route.params;
	const [loading, setIsLoading] = useState(false);
	const [title, setEventTitle] = useState('');
	const [tags, setTag] = useState([]);
	const [description, setEventDescription] = useState('');
	const [location, setAddress] = useState('');
	const [spots, setSpotsAvailable] = useState(0);
	const [datePicker, setDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());
	const [timePicker, setTimePicker] = useState(false);
	const [time, setTime] = useState(new Date(Date.now()));
	const [event, setEvent] = useState('');

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '-' + mm + '-' + yyyy;

	const onEventNameChange = (text) => {
		setEventTitle(text);
	};

	function showDatePicker() {
		setDatePicker(!datePicker);
		setTimePicker(false);
	}

	function onDateSelected(event, value) {
		setDate(value);
	}

	function onTimeSelected(event, value) {
		setTime(value);
	}
	function showTimePicker() {
		setTimePicker(!timePicker);
		setDatePicker(false);
	}

	function onTimeSelected(event, value) {
		setTime(value);
	}

	function onTagSelected(event, value) {
		let arr = [];
		arr.push(value);
		setTag(arr);
	}

	const createNewEvent = async () => {
		setIsLoading(true);
		try {
			const token = await auth.currentUser.getIdToken();

			const data = {
				title,
				description,
				tags,
				spots,
				time,
				date,
				location,
			};

			const response = await fetch(`${apiBaseUrl}/event/${otherParam}/new`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			setEvent(response.data);

			if (response.status != 201) {
				alert('Oops! We were unable to create that event. Try again, please!');
			} else {
				console.log(event);
				navigation.replace('EventDetails', {
					event: event,
				});
			}
		} catch (err) {
			console.error(err.message);
		}
		setIsLoading(false);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Events',
			title: 'New Event',
		});
	}, [navigation]);

	return (
		<ScrollView style={{ backgroundColor: 'white' }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView
					className='w-full'
					style={styles.container}
					behavior={Platform.OS === 'ios' ? 'padding' : null}>
					<StatusBar style='dark' />
					<Text h6 className='text-red-500 p-2'>
						Note: All fields required
					</Text>

					<View>
						<Input
							placeholder='Event Title'
							type='text'
							value={title}
							onChangeText={(text) => onEventNameChange(text)}
						/>

						<Input
							label='Event Description'
							multiline={true}
							style={{ height: 60, textAlignVertical: 'top' }}
							placeholder='A brief description of your event. Minimum of 10 characters'
							type='text'
							value={description}
							onChangeText={(text) => setEventDescription(text)}
						/>

						<Input
							placeholder='Address/Location'
							type='text'
							value={location}
							onChangeText={(text) => setAddress(text)}
						/>

						<Input
							placeholder='Tag e.g. Soccer, Volleyball'
							type='text'
							value={tags}
							onChangeText={(text) => onTagSelected(text)}
						/>

						<Input
							placeholder='Spots available'
							type='text'
							keyboardType={'numeric'}
							value={spots}
							onChangeText={(text) => setSpotsAvailable(text)}
						/>
						<Text class='text-lg'>Select Time & Date</Text>
						<TouchableOpacity
							className='flex-row justify-between m-3'
							onPress={showDatePicker}>
							<View className='flex-row space-x-2 items-center'>
								<Fontisto name='date' size={24} color='black' />
								<Text className='text-lg'>Select Date </Text>
							</View>
							<Text className='text-lg'>{date.toDateString()}</Text>
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
						</View>

						<TouchableOpacity
							className='flex-row justify-between m-3'
							onPress={showTimePicker}>
							<View className='flex-row space-x-2 items-center'>
								<Ionicons name='ios-time-outline' size={28} color='black' />
								<Text className='text-lg'>Select Time </Text>
							</View>
							<Text className='text-lg'>
								{time.toLocaleTimeString('en-US')}
							</Text>
						</TouchableOpacity>

						<View>
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
					</View>
					{loading === true ? (
						<Button loading title='Login' />
					) : (
						<Button raised onPress={createNewEvent} title='Create Event' />
					)}
					{/* <View style={{ height: 100 }}></View> */}
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		padding: 20,
	},
	datePickerStyle: {
		width: 180,
	},
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
});

export default CreateEventScreen;
