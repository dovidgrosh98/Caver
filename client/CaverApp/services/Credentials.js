import { AsyncStorage } from 'react-native'

export const storeUser = async (token, id) => {
	const data = [['token', token], ['userId', id]]
	await AsyncStorage.multiSet(data)
	return true
}

export const getUser = async () => {
	const userId = await AsyncStorage.getItem('userId')
	return parseInt(userId)
}
