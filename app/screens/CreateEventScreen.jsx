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
import React, { useLayoutEffect, useState, useRef } from 'react';
import { auth } from '../firebase';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API } from '@env';

const CreateEventScreen = ({ route, navigation }) => {
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

	const placesRef = useRef();

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
			headerBackTitle: 'Home',
			title: 'New Event',
		});
	}, [navigation]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<StatusBar style='light' />
				<Text h6 className='text-red-500 p-2'>
					All fields required*
				</Text>

				<View style={styles.inputContainer}>
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

					<GooglePlacesAutocomplete
						placeholder='Enter a location'
						onPress={(data, details = null) => {
							setAddress(placesRef.current?.getAddressText());
							console.log(placesRef.current?.getAddressText());
						}}
						ref={placesRef}
						query={{
							key: PLACES_API,
							language: 'en',
						}}
						fetchDetails={true}
						onFail={(error) => console.log(error)}
						onNotFound={() => console.log('no results')}
						value={location}
						styles={{
							container: {
								flex: 0,
								backgroundColor: null,
							},

							predefinedPlacesDescription: {
								color: '#3caf50',
							},
						}}
					/>

					{/* <Input
						placeholder='Tag e.g. Soccer, Volleyball'
						type='text'
						value={tags}
						onChangeText={(text) => onTagSelected(text)}
					/> */}

					<Input
						placeholder='Spots available'
						type='text'
						keyboardType={'numeric'}
						value={spots}
						onChangeText={(text) => setSpotsAvailable(text)}
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
						<Text className='text-lg'>{time.toLocaleTimeString('en-US')}</Text>
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
					<Button
						containerStyle={styles.button}
						buttonStyle={{ backgroundColor: '#102e48' }}
						loading
						title='Login'
					/>
				) : (
					<Button
						containerStyle={styles.button}
						buttonStyle={{
							backgroundColor: '#102e48',
							borderRadius: 5,
						}}
						onPress={createNewEvent}
						title='Create Event'
					/>
				)}
				<View style={{ height: 200 }}></View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		padding: 20,
	},
	inputContainer: {
		width: 300,
	},
	datePickerStyle: {
		width: 180,
	},
	container: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center',
	},
	button: {
		width: 250,
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
