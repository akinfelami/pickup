import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import React from 'react';
import All from '../screens/All';
import Past from '../screens/Past';
import Going from '../screens/Going';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Saved from '../screens/Saved';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const FirstRoute = () => <All />;

const SecondRoute = () => <Past />;

const ThirdRoute = () => <Going />;

const FourthRoute = () => <Saved />;

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
	third: ThirdRoute,
	fourth: FourthRoute,
});

const renderTabBar = (props) => (
	<TabBar
		{...props}
		indicatorStyle={{
			backgroundColor: '#102e48',
			height: 3,
			width: 100,
			borderRadius: 10,
		}}
		renderLabel={({ route, color }) => (
			<Text
				style={{
					color: 'grey',
					fontWeight: '700',
					fontSize: '16',
				}}>
				{route.title}
			</Text>
		)}
		style={{ backgroundColor: null }}
	/>
);

const Tabs = () => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'ALL' },
		{ key: 'fourth', title: 'SAVED' },
		{ key: 'third', title: 'GOING' },
		{ key: 'second', title: 'PAST' },
	]);

	const Tab = createBottomTabNavigator();

	return (
		<TabView
			renderTabBar={renderTabBar}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			style={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {},
	scene: {
		flex: 1,
	},
});

export default Tabs;
