import HomeScreen from '../components/Screens/AppScreens/Home/HomeScreen'
import ListingScreen from '../components/Screens/AppScreens/Home/ListingScreen'
import BookingScreen from '../components/Screens/AppScreens/Home/BookingScreen'
import { createStackNavigator } from 'react-navigation-stack'
import { AsyncStorage } from 'react-native'


export const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Listing: ListingScreen,
    Booking: BookingScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)