import React from 'react'
import {
	createAppContainer,
	createSwitchNavigator,
	createBottomTabNavigator
} from 'react-navigation'
import { highlightColor, textColor, primary } from './components/styles/Colors'
// import { Platform } from '@unimodules/core'
// import { Ionicons as IconComponent } from '@expo/vector-icons'
// Navigators import
import { AuthNavigator, HomeNavigator } from './Navigators'
// Navigators

// const TabNavigator = createBottomTabNavigator(
// 	{
// 		Home: HomeNavigator,
// 		Search: SearchScreen,
// 		Account: Profile
// 	},

// 	{
// 		defaultNavigationOptions: ({ navigation }) => ({
// 			tabBarIcon: ({ focused, tintColor }) => {
// 				const { routeName } = navigation.state
// 				let iconName
// 				switch (routeName) {
// 					case 'Home':
// 						iconName =
// 							Platform.os === 'ios'
// 								? `ios-home${focused ? '' : ''}`
// 								: `md-home${focused ? '' : ''}`
// 						break
// 					case 'Search':
// 						iconName =
// 							Platform.os === 'ios'
// 								? `ios-search${focused ? '' : ''}`
// 								: `md-search${focused ? '' : ''}`
// 						break

// 					case 'Account':
// 						iconName =
// 							Platform.os === 'ios'
// 								? `ios-person${focused ? '' : ''}`
// 								: `md-person${focused ? '' : ''}`
// 						break
// 				}
// 				return <IconComponent name={iconName} size={32} color={tintColor} />
// 			}
// 		}),
// 		tabBarOptions: {
// 			showLabel: false,
// 			activeTintColor: highlightColor,
// 			inactiveTintColor: textColor,
// 			style: {
// 				backgroundColor: primary
// 			}
// 		},
// 		initialRouteName: 'Home'
// 	}
// )

export default createAppContainer(
	createSwitchNavigator({
		Auth: AuthNavigator,
		// App: TabNavigator
	})
)
