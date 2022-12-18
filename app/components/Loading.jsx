import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
	return (
		<View style={styles.loading}>
			<LottieView
				source={require('../assets/90705-simple-loading.json')}
				style={styles.animation}
				autoPlay
			/>
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	loading: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	animation: {
		width: 200,
		height: 100,
	},
});
