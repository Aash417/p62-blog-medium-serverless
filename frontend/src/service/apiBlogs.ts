import { handleAxiosError } from '@utils/helperFn';
import { allBlogResponse } from '@utils/types';
import axios from 'axios';

export async function getAllBlogs(): Promise<allBlogResponse | undefined> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function getOneBlogs(id: number) {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/blog/id/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function createBlog(title: string, content: string) {
	try {
		const response = await axios.post(`${import.meta.env.VITE_BackendUrl}/api/v1/blog`, {
			title,
			content,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}
