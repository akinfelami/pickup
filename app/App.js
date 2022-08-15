import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<TailwindProvider>
				<Stack.Navigator>
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Register' component={Register} />
				</Stack.Navigator>
			</TailwindProvider>
		</NavigationContainer>
	);
}
