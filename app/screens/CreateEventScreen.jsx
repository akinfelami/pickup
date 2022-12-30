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
	Alert,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const CreateEventScreen = ({ route, navigation }) => {
	const [loading, setIsLoading] = useState(false);
	const [title, setEventTitle] = useState('');
	const [tags, setTag] = useState([]);
	const [description, setEventDescription] = useState('');
	const [location, setAddress] = useState('');
	const [spots, setSpotsAvailable] = useState(0);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date(Date.now()));
	const [event, setEvent] = useState('');
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
	const [duration, setDuration] = useState(0);
	const [selectedEventMode, setSelectedEventMode] = useState('');
	const [pickMode, setPickMode] = useState(false);

	const pickerRef = useRef();

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;

	const placesRef = useRef();

	const onEventNameChange = (text) => {
		setEventTitle(text);
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleDateConfirm = (date) => {
		var dateNow = new Date();
		dateNow.setHours(0, 0, 0, 0);
		if (dateNow <= date) {
			setDate(date);
			hideDatePicker();
		} else {
			Alert.alert('Error', 'Please, select a future date!');
		}
	};

	const showTimePicker = () => {
		setTimePickerVisibility(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisibility(false);
	};

	const handleTimeConfirm = (time) => {
		setTime(time);
		hideTimePicker();
	};

	function onTagSelected(event, value) {
		let arr = [];
		arr.push(value);
		setTag(arr);
	}

	const dateTitle = () => {
		return (
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ fontSize: 16, marginRight: 5, color: 'blue' }}>
						Date
					</Text>
					<SimpleLineIcons name='arrow-down' size={15} color='black' />
				</View>

				<Text style={{ fontSize: 18 }}>{date.toDateString()}</Text>
			</View>
		);
	};

	const timeTitle = () => {
		return (
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ fontSize: 16, marginRight: 5, color: 'blue' }}>
						Start Time
					</Text>
					<SimpleLineIcons name='arrow-down' size={15} color='black' />
				</View>

				<Text style={{ fontSize: 18 }}>
					{time.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</Text>
			</View>
		);
	};

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
				<Input
					placeholder='Title (required)'
					type='text'
					value={title}
					onChangeText={(text) => onEventNameChange(text)}
				/>

				<Input
					label='Description (required)'
					multiline={true}
					style={{ height: 80, textAlignVertical: 'top' }}
					placeholder='A brief description of your event. Minimum of 10 characters'
					type='text'
					value={description}
					onChangeText={(text) => setEventDescription(text)}
				/>

				<View
					style={{
						flexDirection: 'row',
						marginBottom: 20,
					}}>
					{/* Date Picker */}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Feather name='calendar' size={32} color='#102e48' />
						<Button
							title={dateTitle}
							onPress={showDatePicker}
							type='outline'
							buttonStyle={{
								borderRadius: 5,
								borderWidth: 0,
								borderColor: '#102e48',
							}}
						/>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode='date'
							onConfirm={handleDateConfirm}
							onCancel={hideDatePicker}
						/>
					</View>

					{/* Time Picker */}
					<View
						style={{
							marginLeft: 50,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}>
						<Feather name='clock' size={32} color='#102e48' />

						<Button
							title={timeTitle}
							onPress={showTimePicker}
							type='outline'
							buttonStyle={{
								borderRadius: 5,
								borderWidth: 0,
								borderColor: '#102e48',
							}}
						/>
						<DateTimePickerModal
							isVisible={isTimePickerVisible}
							mode='time'
							onConfirm={handleTimeConfirm}
							onCancel={hideDatePicker}
						/>
					</View>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Input
							placeholder='Available spots'
							type='text'
							keyboardType={'numeric'}
							value={spots}
							onChangeText={(text) => setSpotsAvailable(text)}
						/>
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Input
							placeholder='Duration (hours)'
							type='text'
							keyboardType='numeric'
							value={duration}
							onChangeText={(text) => setDuration(text)}
						/>
					</View>
				</View>
				<View>
					<Picker
						ref={pickerRef}
						style={{ width: 300, height: 50 }}
						mode={'dropdown'}
						selectedValue={selectedEventMode}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedEventMode(itemValue)
						}>
						<Picker.Item label='Indoor' value='Java' />
						<Picker.Item label='Outdoor' value='Outdoor' />
						<Picker.Item label='Online' value='Online' />
					</Picker>
				</View>

				{/* <GooglePlacesAutocomplete
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
								backgroundColor: 'white',
							},

							predefinedPlacesDescription: {
								color: '#3caf50',
							},
						}}
					/> */}

				<Input
					placeholder='Topics e.g. Soccer, Volleyball'
					type='text'
					value={tags}
					onChangeText={(text) => onTagSelected(text)}
				/>

				{/* {loading === true ? (
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
				)} */}
				<View style={{ height: 200 }}></View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		marginTop: 30,
		alignItems: 'center',
	},
	button: {
		width: 200,
		borderRadius: 10,
	},
});

export default CreateEventScreen;
