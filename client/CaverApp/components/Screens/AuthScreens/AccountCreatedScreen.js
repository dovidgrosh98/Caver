import React from 'react'
import { Button } from '../../common'
import { Text, Image, View, StyleSheet } from 'react-native'
import { highlightColor } from '../../styles/Colors'

const AccountCreatedScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/cryptkeyLogo.png')}
				style={styles.image}
			/>
			<Text style={styles.text}>Account Successfully Created</Text>
			<Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		color: highlightColor,
		marginVertical: 20
	},
	image: {
		height: 200,
		width: 200
	}
})

export default AccountCreatedScreen
