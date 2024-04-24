import { handleAxiosError } from '@utils/helperFn';
import { UserDataType } from '@utils/types';
import axios from 'axios';

export async function getCurrentUser(): Promise<UserDataType | undefined> {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/user/currentUser`,
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}
