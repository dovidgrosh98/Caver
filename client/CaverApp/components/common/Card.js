import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { textColor, cardColor } from '../styles/Colors'

export const Card = ({ children, style }) => {
	return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: cardColor,
		width: 'auto',
		alignSelf: 'stretch',
		borderRadius: 10
	}
})
