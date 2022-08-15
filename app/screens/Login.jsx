import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import React, { useState } from 'react';
import { Link } from '@react-navigation/native';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
						placeholder='Email'
						autoFocus
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
				</View>
				<Button title='Login' style={{ width: 200 }} />
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
