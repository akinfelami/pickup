import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import TabBar from './TabBar';
import All from '../screens/All';
import Past from '../screens/Past';
import Going from '../screens/Going';

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
	return (
		<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
			<Tab.Screen name='All' component={All} />
			<Tab.Screen name='Past' component={Past} />
			<Tab.Screen name='Going' component={Going} />
		</Tab.Navigator>
	);
};

export default Tabs;
