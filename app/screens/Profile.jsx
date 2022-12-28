import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Image, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Profile = ({ route, navigation }) => {
	const { data } = route.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<Button title='Done' type='clear' onPress={() => navigation.goBack()} />
			),
		});
	}, [navigation]);

	const signOutDialog = async () => {
		Alert.alert('Sign out', 'Are you sure you want to sign out?', [
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Sign out',
				onPress: () => {
					signOut(auth);
					navigation.replace('Login');
				},
			},
		]);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style='light' />
			<View style={{ padding: 30 }}>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Image
						source={require('../assets/profileimg.png')}
						style={{ width: 150, height: 150 }}
					/>
					<Text h3 style={{ marginTop: 10 }}>
						{data.firstName} {data.lastName}
					</Text>

					<Button
						buttonStyle={{
							backgroundColor: '#102e48',
							borderRadius: 30,
							width: 250,
							marginTop: 10,
						}}
						title='Follow'
					/>

					<Button
						buttonStyle={{
							borderRadius: 30,
							width: 250,
							marginTop: 10,
							borderColor: '#102e48',
						}}
						title='Sign out'
						type='outline'
						onPress={signOutDialog}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({});
