import { handleAxiosError } from '@/utils/helperFn';
import axios from 'axios';

export async function toggleLike(blogId: string) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BackendUrl}/api/v1/like/toggle?blogId=${blogId}`,
			{
				blogId, // have to send this for the sake of post req, but not gonna use this,
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function checkLikeStatus(blogId: string) {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/like/checkLike?blogId=${blogId}`,
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}
