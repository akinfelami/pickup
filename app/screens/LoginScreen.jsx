import {
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import { Image, Text, Input, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
	const [loading, setIsLoading] = useState(false);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				navigation.replace('Home');
			}
		});
		return unsub;
	}, []);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const height = useHeaderHeight();

	const loginUser = () => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setIsLoading(false);
			})
			.catch((error) => {
				alert(error.code);
			});
		setIsLoading(false);
	};

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={height + 64}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1'>
			<SafeAreaView className='flex-1'>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View>
						<View className='justify-items-center items-center flex-1 pt-8'>
							<Image
								source={require('../assets/pickup.png')}
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
							{loading === true ? (
								<Button loading title='Login' style={{ width: 200 }} />
							) : (
								<Button
									raised
									onPress={loginUser}
									title='Login'
									style={{ width: 200 }}
								/>
							)}

							<View className='pt-4 items-center flex-row space-x-1'>
								<Text>Don't have an account? </Text>
								<TouchableOpacity>
									<Link to={{ screen: 'Register' }}>
										<Text className='underline text-sky-400'>
											Register here
										</Text>
									</Link>
								</TouchableOpacity>
							</View>
							<Text className='pt-2 underline text-sky-400'>
								Forgot Password
							</Text>

							<View style={{ flex: 1 }} />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Login;
