import axios from 'axios'
import { getUser } from './Credentials'
const JwtToken = 'token'
const BASE_URL = `http://localhost:3000`

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
			userId: res.data.user.id
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
    console.log(data)
		return data
	} catch (error) {
		throw error
	}
}

