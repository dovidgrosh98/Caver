import React, { useEffect } from 'react'
import { Image, View, StyleSheet, AsyncStorage } from 'react-native'
import { getUser } from '../../../services/Credentials'

const Splash = (props) => {
	const getToken = async () => {
    // AsyncStorage.clear()
    const token = await getUser()
		if (token) props.navigation.navigate('App')
		else props.navigation.navigate('SignIn')
    }
    
    useEffect(() => {
		getToken()
	}, [])

	return (
		<View style={styles.container}>
			<Image source={require('../../../assets/caverLogo.png')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
})

export default Splash
