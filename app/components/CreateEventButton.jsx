import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

const CreateEventButton = () => {
	return (
		<View style={styles.container}>
			<Button
				buttonStyle={{
					backgroundColor: '#102e48',
					borderRadius: 15,
					width: 150,
				}}
				containerStyle={styles.button}
				title='Create Event'
			/>
		</View>
	);
};

export default CreateEventButton;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
		bottom: 10,
		right: 10,
	},
});
