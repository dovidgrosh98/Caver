import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import {
	background,
	textColor,
	danger,
	placeHolderColor
} from '../styles/Colors'

export const Input = ({
	label,
	value,
	onChangeText,
	style,
	// secureTextEntry,
	placeholder,
	error,
	focused
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{label}</Text>
			<TextInput
				value={value}
				autoCorrect={false}
				placeholder={placeholder}
				placeholderTextColor={placeHolderColor}
				autoCompleteType="off"
				autoCapitalize="none"
				// secureTextEntry={secureTextEntry}
				onChangeText={onChangeText}
				style={[
					error
						? [styles.input, styles.inputError, style]
						: [styles.input, style],
					focused
						? [styles.input, style, styles.inputFocus]
						: [styles.input, style]
				]}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		width: 300,
		marginBottom: 20
	},
	input: {
		backgroundColor: background,
		color: textColor,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignSelf: 'stretch'
	},
	inputError: {
		borderWidth: 2,
		borderColor: danger
	},
	text: {
		alignSelf: 'flex-start',
		color: textColor,
		fontSize: 18,
		marginBottom: 8
	},
	inputFocus: {
		borderWidth: 2,
		borderColor: textColor
	}
})
