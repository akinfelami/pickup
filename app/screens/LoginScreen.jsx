import {
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	ActivityIndicator,
	StyleSheet,
	TextInput,
} from 'react-native';
import { Image, Text, Input, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

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
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === 'ios' ? 'padding' : ''}>
					<StatusBar style='dark' />
					<View>
						<Text className='mb-5 text-center' h3>
							{' '}
							Login To Pickup
						</Text>
						<View style={{ width: 300 }}>
							<Input
								textContentType='username'
								placeholder='Email'
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
							<Button loading title='Login' />
						) : (
							<Button raised onPress={loginUser} title='Login' />
						)}

						<View className='pt-4 items-center flex-row space-x-1'>
							<Text>Don't have an account? </Text>
							<TouchableOpacity>
								<Link to={{ screen: 'Register' }}>
									<Text className='underline text-sky-400'>Register here</Text>
								</Link>
							</TouchableOpacity>
						</View>
						<Text className='pt-2 underline text-sky-400'>Forgot Password</Text>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</>
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

export default Login;
