import { handleAxiosError } from '@/utils/helperFn';
import { allSavedBookmarksResponse } from '@/utils/types';
import axios from 'axios';

export async function toggleBookmark(blogId: string) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BackendUrl}/api/v1/bookmark/toggle?blogId=${blogId}`,
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

export async function checkBookmarkStatus(blogId: string) {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/bookmark/checkBookmark?blogId=${blogId}`,
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function getAllSavedBookmarks(): Promise<allSavedBookmarksResponse | undefined> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/bookmark/all`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}
