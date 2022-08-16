import { View, KeyboardAvoidingView } from 'react-native';
import { Image, Text, Input, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { auth } from './../firebase';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setisLoggedIn] = useState(false);

	const loginUser = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredentialer) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	useEffect(() => {
		const unsubcribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace('Home');
			}
		});
		return unsubcribe;
	}, []);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			className='flex-1'>
			<View className='justify-items-center items-center flex-1 pt-8'>
				<Image
					source={{
						uri: 'https://firebasestorage.googleapis.com/v0/b/cornell-pickup.appspot.com/o/pickup.png?alt=media&token=511330b4-fa98-4dc6-aefe-4a4cda2e77ef',
					}}
					style={{ width: 300, height: 300 }}
				/>
				<View style={{ width: 350 }}>
					<Input
						textContentType='username'
						placeholder='Email'
						autoFocus
						type='email'
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>

					<Input
						placeholder='Password'
						textContentType='password'
						secureTextEntry
						type='password'
						value={password}
						onChangeText={(text) => setPassword(text)}
						onSubmitEditing={loginUser}
					/>
				</View>
				<Button onPress={loginUser} title='Login' style={{ width: 200 }} />
				<View className='pt-1 items-center'>
					<Text className='pt-2'>
						Don't have an account?{' '}
						<Link to={{ screen: 'Register' }}>
							<Text className='underline text-sky-400'>Register here</Text>
						</Link>
					</Text>
					<Text className='pt-2 underline text-sky-400'>Forgot Password</Text>
				</View>
			</View>

			<View style={{ width: 100 }}></View>
		</KeyboardAvoidingView>
	);
};

export default Login;
