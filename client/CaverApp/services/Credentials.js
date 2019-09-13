import { AsyncStorage } from 'react-native'

export const storeUser = async (token, id, isRenter) => {
	console.log(isRenter)
	const data = [['token', token], ['userId', id.toString()], ['isRenter', isRenter.toString()]]
	await AsyncStorage.multiSet(data)
	return true
}

export const getUser = async () => {
	const userId = await AsyncStorage.getItem('userId')
	return parseInt(userId)
}
