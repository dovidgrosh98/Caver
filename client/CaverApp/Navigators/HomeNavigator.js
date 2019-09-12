import HomeScreen from '../components/Screens/AppScreens/Home/HomeScreen'
import { createStackNavigator } from 'react-navigation-stack'

export const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)