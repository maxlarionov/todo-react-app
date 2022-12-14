import axios from 'axios'
import { API_URL } from './config'

export const getUsers = async () => {
	const response = await axios.get(API_URL)
	return response.data
}

export const getTasks = async (userId) => {
	const response = await axios.get(API_URL + userId)
	return response.data
}

export const postUser = async (data) => {
	const response = await axios.post(API_URL, data)
	return response.data
}

export const editDataTask = async (userId, data) => {
	const response = await axios.put(API_URL + userId, data)
	return response.data
}

export const editData = async (userId, data) => {
	const response = await axios.put(API_URL + userId, data)
	return response.data
}

export const deleteUser = async (userId) => {
	const response = await axios.delete(API_URL + userId)
	return response.data
}