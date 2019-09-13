import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { getUser } from './Credentials'
import { GOOGLE_MAPS } from 'react-native-dotenv'
const JwtToken = 'token'
const BASE_URL = `https://caver-app.herokuapp.com/`

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const loginUser = async (user) => {
	try {
		const res = await api.post('/auth/login', user)
		const response = {
			status: res.status,
			token: res.data.token,
			userId: res.data.user.id,
			isRenter: res.data.user.isRenter
		}

		return response
	} catch (error) {
		throw error
	}
}

export const getCurrentUser = async () => {
	try {
		const userId = await getUser()
		const res = await api.get(`/auth/${userId}`)
		return res.data
	} catch (error) {
		throw error
	}
}

export const signUpUser = async (user) => {
	try {
		const res = await api.post('/auth/signup', user)
    const data = { status: res.status, data: res.data }
		return data
	} catch (error) {
		throw error
	}
}

export const allListings = async () => {
	try {
		const res = await api.get('/list/')
		return res
	} 
	catch (error) {
		throw error	
	}
}

export const getListing = async (id) => {
	try {
		const res = await api.get(`/list/${id}`)
		return res
	} 
	catch (error) {
		throw error	
	}
}

export const getGeoCode = async (name,city,state) => {
	try {
			const url = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name},${city},${state}&key=${GOOGLE_MAPS}`);
			const resp =  await url.json()
			return resp.results[0].geometry.location
	} catch (error) {
			throw error
	}
}

export const createListing = async (data) => {
	try {
		const id = await AsyncStorage.getItem('')
		const res = await api.post(`/list/user_id/${id}`, data)
		console.log(res)
		return res
	} 
	catch (error) {
		throw error	
	}
} 