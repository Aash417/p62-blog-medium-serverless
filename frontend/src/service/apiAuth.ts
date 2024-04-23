import axios, { AxiosError } from 'axios';

export interface UserDataType {
	id: number;
	email: string;
	name: string;
	password: string;
	createdAt: string;
}

export async function getCurrentUser(): Promise<UserDataType | undefined> {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/user/currentUser`,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		// Handle error
		const axiosError = error as AxiosError;
		if (axiosError.response) {
			// console.error('Response data:', axiosError.response.data);
			throw axiosError.response.data;
		} else if (axiosError.request) {
			console.error('No response received:', axiosError.request);
		} else {
			console.error('Error:', axiosError.message);
		}
		console.error('Error config:', axiosError.config);
	}
}
