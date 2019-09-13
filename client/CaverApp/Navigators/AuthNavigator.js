import SplashScreen from '../components/Screens/AuthScreens/SplashScreen'
import SignInScreen from '../components/Screens/AuthScreens/SignInScreen'
import SignUpScreen from '../components/Screens/AuthScreens/SignUpScreen'
import AccountCreatedScreen from '../components/Screens/AuthScreens/AccountCreatedScreen'
import { createStackNavigator } from 'react-navigation-stack'

export const AuthNavigator = createStackNavigator(
	{
		Splash: SplashScreen,
		SignIn: SignInScreen,
		CreateAccount: SignUpScreen,
		AccountCreated: AccountCreatedScreen
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
)
