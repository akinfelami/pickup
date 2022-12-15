import {
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	TextInput,
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

	let currentUser;

	const registerUser = async () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (password === confirmPassword && reg.test(email) != false) {
			try {
				const data = {
					email,
					password,
					firstName,
					lastName,
				};
				setIsLoading(true);

				await createUserWithEmailAndPassword(auth, email, password);

				const response = await fetch(
					`${apiBaseUrl}/user/register/${auth.currentUser.uid}`,
					{
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					}
				);

				if (response.status != 201) {
					alert(
						'We were unable to register you. You might\
						already have an account. Login instead or try again later'
					);
				}

				setIsLoading(false);
			} catch (err) {
				console.error(err.message);
			}
		} else {
			alert('Your email is invalid or your passwords do not match');
		}
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
						<Button type='outline' loading title='Register' />
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
		padding: 8,
		backgroundColor: 'white',
	},
});

export default Register;
