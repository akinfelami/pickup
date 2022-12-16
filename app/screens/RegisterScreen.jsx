import {
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { apiBaseUrl } from '../constants';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [loading, setIsLoading] = useState(false);

	const updateFirebaseId = async () => {
		try {
			userData = {
				firebaseId: auth.currentUser.uid,
			};
			const token = await auth.currentUser.getIdToken();
			const uid = await auth.currentUser.uid;
			const user = await fetch(`${apiBaseUrl}/user/get/${uid}`, {
				headers: { authorization: `Bearer ${token}` },
			});
			const data = await user.json();
			console.log(data);
			const response = await fetch(
				`${apiBaseUrl}/user/update/firebase/${data.id}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				}
			);
			console.log(response.status);
		} catch (err) {
			console.error(err);
		}
	};

	const firebaseRegister = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			//  Storing firebaseId is not necesarily important for our app at this moment
			// await updateFirebaseId();
		} catch (err) {
			let errorMessage = err.code;
			if (errorMessage === 'auth/email-already-in-use') {
				Alert.alert('Error', 'Email already in use!');
			} else if (errorMessage === 'auth/invalid-email') {
				Alert.alert('Error', 'Invalid Email');
			} else if (errorMessage === 'auth/weak-password') {
				Alert.alert('Error, Password is weak, please try again');
			}
		}
	};

	const apiRegister = async () => {
		const data = {
			email,
			password,
			firstName,
			lastName,
		};
		try {
			await fetch(`${apiBaseUrl}/user/register/`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (err) {
			Alert.alert('Error', 'We were unable to register you, please try again!');
		}
	};

	const registerUser = async () => {
		setIsLoading(true);
		if (password === confirmPassword) {
			if (
				email === '' ||
				password === '' ||
				firstName === '' ||
				lastName === ''
			) {
				Alert.alert('Error', 'All fields are required!');
			} else {
				try {
					await apiRegister();
					await firebaseRegister();
				} catch (err) {
					console.error(err);
				}
			}
		} else {
			Alert.alert('Error', 'Passwords do not match');
		}
		setIsLoading(false);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Login',
		});
	}, [navigation]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<StatusBar style='light' />
				<View>
					<Text className='mb-5 text-center' h3>
						{' '}
						Create a Pickup account
					</Text>
					<View style={{ width: 300 }}>
						<Input
							placeholder='First Name'
							type='text'
							value={firstName}
							onChangeText={(text) => setFirstName(text)}
						/>

						<Input
							placeholder='Last Name'
							type='text'
							value={lastName}
							onChangeText={(text) => setLastName(text)}
						/>
						<Input
							placeholder='Email'
							autoCapitalize='none'
							type='email'
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<Input
							placeholder='Password'
							secureTextEntry
							type='password'
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<Input
							placeholder='Confirm Password'
							secureTextEntry
							type='password'
							value={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
							onSubmitEditing={registerUser}
						/>
					</View>
					{loading === true ? (
						<Button
							buttonStyle={{
								backgroundColor: '#102e48',
								borderRadius: 5,
							}}
							type='outline'
							loading
							title='Register'
						/>
					) : (
						<Button
							buttonStyle={{
								backgroundColor: '#102e48',
								borderRadius: 5,
							}}
							raised
							onPress={registerUser}
							title='Register'
						/>
					)}

					<View className='pt-4 items-center flex-row space-x-1'>
						<Text>Already have an account? </Text>
						<TouchableOpacity>
							<Link to={{ screen: 'Login' }}>
								<Text className='underline text-sky-400'>Login</Text>
							</Link>
						</TouchableOpacity>
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
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: 'white',
	},
});

export default Register;
