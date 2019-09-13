import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { primary } from '../styles/Colors'
const screenWidth = Math.round(Dimensions.get('window').width)
export const Header = ({ children, style }) => {
	return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
	container: {
		width: screenWidth,
		backgroundColor: primary,
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center'
	}
})
