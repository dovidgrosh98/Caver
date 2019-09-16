import React from 'react'
import {
	createAppContainer,
	createSwitchNavigator,
} from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { highlightColor, textColor, primary } from './components/styles/Colors'
import { Platform } from '@unimodules/core'
import { Ionicons as IconComponent } from '@expo/vector-icons'
// Navigators import
import { AuthNavigator, HomeNavigator } from './Navigators'
import HomeScreen from './components/Screens/AppScreens/Home/HomeScreen';
import ChatScreen from './components/Screens/AppScreens/Chat/ChatScreen';
import CreateListingScreen from './components/Screens/AppScreens/CreateListing/CreateListingScreen';
import ProfileScreen from './components/Screens/AppScreens/Profile/ProfileScreen';

// Navigators
const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeNavigator,
		Create: CreateListingScreen,
		Chat: ChatScreen,
		Profile: ProfileScreen
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state
				let iconName
				switch (routeName) {
					case 'Home':
						iconName =
							Platform.OS === 'ios'
								? `ios-home${focused ? '' : ''}`
								: `md-home${focused ? '' : ''}`
						break
					case 'Create':
						iconName =
							Platform.OS === 'ios'
								? 
								`ios-add-circle-outline${focused ? '' : ''}`
								: 
								`ios-add-circle-outline${focused ? '' : ''}`
						break

					case 'Chat':
						iconName =
							Platform.OS === 'ios'
								? `ios-chatbubbles${focused ? '' : ''}`
								: `md-chatbubbles${focused ? '' : ''}`
						break
					case 'Profile':
						iconName =
							Platform.OS === 'ios'
								? `ios-person${focused ? '' : ''}`
								: `md-person${focused ? '' : ''}`
						break
				}
				return <IconComponent name={iconName} size={32} />
			}
		}),
		tabBarOptions: {
			showLabel: false,
			activeTintColor: highlightColor,
			inactiveTintColor: textColor,
			style: {
				backgroundColor: primary
			}
		},
		initialRouteName: 'Home'
	}
)

export default createAppContainer(
	createSwitchNavigator({
		Auth: AuthNavigator,
		App: TabNavigator
	})
)
