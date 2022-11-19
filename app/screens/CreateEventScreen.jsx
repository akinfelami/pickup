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
import { apiBaseUrl } from '../constants';
import React, { useLayoutEffect, useState } from 'react';
import { auth } from '../firebase';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const CreateEventScreen = ({ route, navigation }) => {
	const { otherParam } = route.params;
	// const [loading, setIsLoading] = useState(false);
	const [title, setEventTitle] = useState('');
	const [tags, setTag] = useState([]);
	const [description, setEventDescription] = useState('');
	const [location, setAddress] = useState('');
	const [spots, setSpotsAvailable] = useState(0);
	const [datePicker, setDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());
	const [timePicker, setTimePicker] = useState(false);
	const [time, setTime] = useState(new Date(Date.now()));
	const [featherSelected, setFeatherSelected] = useState(false);
	time.setSeconds(0, 0);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const onEventNameChange = (text) => {
		setEventTitle(text);
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

	function onTagSelected(event, value) {
		let arr = [];
		arr.push(value);
		setTag(arr);
	}

	const createNewEvent = async () => {
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

			console.log(data);

			const response = await fetch(`${apiBaseUrl}/event/${otherParam}/new`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			console.log(response);

			// if (response.status != 201) {
			// 	alert(
			// 		'Oops! We were unable to create that event. Try again, please!'
			// 	);
			// }
		} catch (err) {
			console.error(err.message);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Events',
			title: 'New Event',
			headerRight: () => (
				<Feather onPress={createNewEvent} name='send' size={24} color='black' />
			),
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

					<View className='p-2'>
						<Input
							placeholder='Enter a name for your event'
							type='text'
							value={title}
							onChangeText={(text) => onEventNameChange(text)}
						/>
						<Input
							label='Event Description'
							multiline={true}
							style={{ height: 70, textAlignVertical: 'top' }}
							placeholder='A brief description of your event. Minimum of 10 characters'
							type='text'
							value={description}
							onChangeText={(text) => setEventDescription(text)}
						/>

						<Input
							placeholder='Address or Location'
							type='text'
							value={location}
							onChangeText={(text) => setAddress(text)}
						/>

						<Input
							placeholder='Tag e.g. Soccer'
							type='text'
							value={tags}
							onChangeText={(text) => onTagSelected(text)}
						/>

						<Input
							placeholder='Spots available'
							type='text'
							keyboardType='numeric'
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
								<Ionicons name='ios-time-outline' size={24} color='black' />
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

						{/* Holding off on addding photos for now. How do I moderate the photos added? */}

						{/* <TouchableOpacity
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
						</TouchableOpacity> */}
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
