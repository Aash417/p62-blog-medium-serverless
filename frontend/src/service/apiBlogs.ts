import { handleAxiosError } from '@/utils/helperFn';
import { allBlogsResponse, oneBlogResponse } from '@/utils/types';
import axios from 'axios';

export async function getAllBlogs(): Promise<allBlogsResponse | undefined> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function getOneBlog(id: string): Promise<oneBlogResponse | undefined> {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/blog/id/${id}`,
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function createBlog({ title, content }: { title: string; content: string }) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BackendUrl}/api/v1/blog/create`,
			{ title, content },
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}
