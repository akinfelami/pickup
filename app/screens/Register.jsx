import { View, KeyboardAvoidingView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import { auth } from './../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { apiBaseUrl } from './../constants';

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

				const response = await fetch(`${apiBaseUrl}/user/register`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				console.log(response.status);
				if (response.status === 201) {
					const authUser = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					const user = authUser.user;
				} else {
					alert(
						'We were unable to register you. You might\
						already have an account. Login instead or try again later'
					);
				}
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
