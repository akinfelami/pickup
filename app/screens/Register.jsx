import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
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
				const response = await fetch(`${apiBaseUrl}/user/register`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				if (response.status === 201) {
					const userData = response.json();
					console.log(userData);
					const authUser = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					currentUser = auth.currentUser;

					await fetch(`${apiBaseUrl}/user/update/firebase/${userId}`, {
						method: 'PUT',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: {
							firebaseId: auth.currentUser.uid,
						},
					});
				} else {
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
				{loading === true ? (
					<Button loading title='Register' style={{ width: 250 }} />
				) : (
					<Button
						raised
						onPress={registerUser}
						title='Register'
						style={{ width: 250 }}
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

			<View style={{ width: 100 }}></View>
		</KeyboardAvoidingView>
	);
};

export default Register;
