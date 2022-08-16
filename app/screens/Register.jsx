import { View, KeyboardAvoidingView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { auth } from './../firebase';

const Register = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

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
				console.log(email);
				console.log(password);
				console.log(firstName);
				console.log(lastName);
				const response = await axios.post(
					'https://pickupapi.herokuapp.com/user/register',

					JSON.stringify(data),
					{
						headers: {
							'Content-Type': 'application/json; charset=UTF-8',
						},
					}
				);

				const authUser = await auth.createUserWithEmailAndPassword(
					email,
					password
				);
				authUser.user.updateProfile({
					displayName: firstName,
				});
				console.log(response.data);
				return response.data;
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
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			className='flex-1'>
			<View className='justify-items-center items-center flex-1 pt-20'>
				<Text h3> Create a Pickup account</Text>
				<View className='pt-10' style={{ width: 350 }}>
					<Input
						required
						placeholder='First Name'
						autoFocus
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
				<Button
					raised
					onPress={registerUser}
					title='Register'
					style={{ width: 250 }}
				/>
			</View>

			<View style={{ width: 100 }}></View>
		</KeyboardAvoidingView>
	);
};

export default Register;
