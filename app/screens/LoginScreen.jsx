import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
	Alert,
} from 'react-native';
import { Image, Text, Input, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
	const [loading, setIsLoading] = useState(false);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				navigation.replace('Index');
			}
		});
		return unsub;
	}, []);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginUser = () => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setIsLoading(false);
			})
			.catch((error) => {
				let errorMessage = error.code;
				if (errorMessage === 'auth/invalid-email') {
					Alert.alert('Login error', 'Invalid email!');
				} else if (errorMessage === 'auth/user-disabled') {
					Alert.alert('Login error', 'Your account has been disabled!');
				} else if (errorMessage === 'auth/user-not-found') {
					Alert.alert('Login error', 'No user found!');
				} else if (errorMessage === 'auth/wrong-password') {
					Alert.alert('Login error', 'Incorrect password!');
				}
			});
		setIsLoading(false);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}>
				<StatusBar style='light' />
				<Image
					source={require('./../assets/pickup.png')}
					style={{ width: 200, height: 200 }}
				/>
				<View style={styles.inputContainer}>
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
						onSubmitEditing={loginUser}
					/>
				</View>
				{loading === true ? (
					<Button
						buttonStyle={{
							backgroundColor: '#102e48',
							borderRadius: 5,
						}}
						containerStyle={styles.button}
						loading
						title='Login'
					/>
				) : (
					<Button
						buttonStyle={{
							backgroundColor: '#102e48',
							borderRadius: 5,
						}}
						containerStyle={styles.button}
						raised
						onPress={loginUser}
						title='Login'
					/>
				)}
				<Button
					containerStyle={styles.button}
					title='Register'
					type='outline'
					onPress={() => navigation.navigate('Register')}
				/>
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
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
});

export default Login;
