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
	FlatList,
	Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Text, Button } from 'react-native-elements';
import { apiBaseUrl } from '../constants';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { auth } from '../firebase';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API } from '@env';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

const CreateEventScreen = ({ route, navigation }) => {
	const [loading, setIsLoading] = useState(false);
	const [title, setEventTitle] = useState('');
	const [tags, setTag] = useState([]);
	const [description, setEventDescription] = useState('');
	const [location, setAddress] = useState('');
	const [spots, setSpotsAvailable] = useState(0);
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date(Date.now()));
	const [event, setEvent] = useState('');
	const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
	const [isEndPickerVisible, setEndPickerVisibility] = useState(false);

	const [selectedEventMode, setSelectedEventMode] = useState('');

	const { userId } = route.params;

	const pickerRef = useRef();

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}

	const placesRef = useRef();

	const onEventNameChange = (text) => {
		setEventTitle(text);
	};

	const showStartPicker = () => {
		setStartPickerVisibility(true);
	};

	const hideStartPicker = () => {
		setStartPickerVisibility(false);
	};

	const handleStartConfirm = (date) => {
		var dateNow = new Date();
		dateNow.setHours(0, 0, 0, 0);
		if (dateNow <= date) {
			setStart(date);
			hideStartPicker();
		} else {
			Alert.alert('Error', 'Please, select a future date!');
		}
	};

	const showEndPicker = () => {
		setEndPickerVisibility(true);
	};

	const hideEndPicker = () => {
		setEndPickerVisibility(false);
	};

	const handleEndConfirm = (time) => {
		if (start > time) {
			Alert.alert('Error', 'Event must end at a later date');
		} else {
			setEnd(time);
			hideEndPicker();
		}
	};

	function onTagSelected(event, value) {
		let arr = [];
		arr.push(value);
		setTag(arr);
	}

	var dd = String(start.getDate()).padStart(2, '0');
	var mm = String(start.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = start.getFullYear();
	const DDMMYY = mm + '/' + dd + '/' + yyyy;

	// May the gods of Javascript forgive me for repeating code  :(
	var dd = String(end.getDate()).padStart(2, '0');
	var mm = String(end.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = end.getFullYear();
	const DDMMYYend = mm + '/' + dd + '/' + yyyy;

	const modeOptions = [
		{
			id: '1',
			title: 'Start',
			defaultDate: DDMMYY,
			defaultTime: start.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			onPressItem: showStartPicker,
		},
		{
			id: '2',
			title: 'End',
			defaultDate: DDMMYYend,
			defaultTime: end.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			onPressItem: showEndPicker,
		},

		// {
		// 	id: '4',
		// 	title: 'Topics',
		// 	defaultText: 'e.g Soccer',
		// },
	];

	const createNewEvent = async () => {
		setIsLoading(true);
		try {
			const token = await auth.currentUser.getIdToken();

			const data = {
				title,
				description,
				startTime: start,
				endTime: end,
				location,
			};

			const response = await fetch(`${apiBaseUrl}/event/${userId}/new`, {
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
				Alert.alert(
					'Error',
					'Oops! We were unable to create that event. Try again, please!'
				);
			} else {
				console.log(event);
				navigation.navigate('EventDetails', {
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

	const Item = ({
		title,
		defaultText,
		defaultTime,
		defaultDate,
		onPressItem,
	}) => (
		<TouchableOpacity style={styles.item} onPress={onPressItem}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					flex: 1,
					justifyContent: 'space-between',
				}}>
				<View>
					<Text style={styles.title}> {title}</Text>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}>
						<Text style={{ color: 'grey', fontSize: 16 }}>{defaultText}</Text>
						<Text style={{ color: 'grey', fontSize: 16 }}>{defaultDate} </Text>

						<Text style={{ color: 'grey', fontSize: 16 }}>{defaultTime}</Text>
						<MaterialIcons
							name='keyboard-arrow-right'
							size={30}
							color='black'
						/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => (
		<Item
			title={item.title}
			defaultText={item.defaultText}
			onPressItem={item.onPressItem}
			defaultDate={item.defaultDate}
			defaultTime={item.defaultTime}
		/>
	);

	const ItemSeparatorView = () => {
		return (
			//Item Separator
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: '#C8C8C8',
					marginLeft: 10,
				}}
			/>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<StatusBar style='light' />
				<ScrollView>
					<Input
						style={{ padding: 10, marginTop: 20 }}
						placeholder='Event Name (required)'
						type='text'
						value={title}
						onChangeText={(text) => onEventNameChange(text)}
					/>
					<Input
						label='Description (required)'
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
						listEmptyComponent={() => (
							<View style={{ flex: 1 }}>
								<Text>No results were found</Text>
							</View>
						)}
						textInputProps={{
							InputComp: Input,
						}}
						value={location}
						styles={{
							container: {
								flex: 0,
							},

							description: {
								fontSize: 20,
							},
						}}
					/>
					<Input
						placeholder='Available spots'
						type='text'
						keyboardType={'numeric'}
						value={spots}
						onChangeText={(text) => setSpotsAvailable(text)}
					/>

					<FlatList
						scrollEnabled={false}
						style={{ width: '100%' }}
						data={modeOptions}
						ItemSeparatorComponent={ItemSeparatorView}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>

					{/* <Input
						placeholder='Topics e.g. Soccer, Volleyball'
						type='text'
						value={tags}
						onChangeText={(text) => onTagSelected(text)}
					/> */}
					<View style={{ alignItems: 'center', padding: 20 }}>
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
					</View>

					<View>
						{/* Start */}
						<DateTimePickerModal
							isVisible={isStartPickerVisible}
							mode='datetime'
							onConfirm={handleStartConfirm}
							onCancel={hideStartPicker}
						/>

						{/* End */}

						<DateTimePickerModal
							isVisible={isEndPickerVisible}
							mode='datetime'
							onConfirm={handleEndConfirm}
							onCancel={hideEndPicker}
						/>
					</View>
					<View style={{ height: 200 }}></View>
				</ScrollView>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: { padding: 10, flex: 1, backgroundColor: 'white' },
	button: {
		width: 200,
		borderRadius: 10,
	},
	title: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

export default CreateEventScreen;
