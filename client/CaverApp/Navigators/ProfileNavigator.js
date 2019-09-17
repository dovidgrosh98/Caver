import { createStackNavigator } from 'react-navigation-stack'
import ProfileScreen from '../components/Screens/AppScreens/Profile/ProfileScreen'
import EditScreen from '../components/Screens/AppScreens/Profile/EditScreen'

export const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)