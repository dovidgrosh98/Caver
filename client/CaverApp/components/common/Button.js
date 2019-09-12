import React, { useState } from 'react'
import { StyleSheet, TouchableHighlight, Text } from 'react-native'
import {
	highlightColor,
	textColor,
	primary,
	danger,
	disabled
} from '../styles/Colors'

export const Button = ({ onPress, children, style, disabled, title }) => {
	const [pressed, isPress] = useState(false)

	return (
		<TouchableHighlight
			onPress={onPress}
			underlayColor={highlightColor}
			onShowUnderlay={() => isPress(true)}
			onHideUnderlay={() => isPress(false)}
			disabled={disabled}
			style={
				disabled
					? [styles.button, styles.buttonError, style]
					: [styles.button, styles.buttonNoError, style]
			}>
			{children ? (
				children
			) : (
				<Text
					style={[
						pressed === true
							? styles.buttonPress
							: [styles.text, styles.textNoError],
						disabled
							? [styles.text, styles.textError]
							: [styles.text, styles.textNoError]
					]}>
					{title}
				</Text>
			)}
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		marginHorizontal: 40,
    alignItems: 'center',
    alignSelf: 'stretch'
	},
	buttonNoError: {
		borderColor: highlightColor
	},
	buttonError: {
		borderColor: disabled
	},
	buttonPress: {
		fontSize: 20,
		color: primary
	},
	text: {
		fontSize: 20
	},
	textError: {
		color: disabled
	},
	textNoError: {
		color: textColor
	}
})
