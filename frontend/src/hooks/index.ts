/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

interface blog {
	id: string;
	author: { name: string };
	title: string;
	content: string;
	publishDate: string;
}

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<blog[]>([]);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all/`, {
				withCredentials: true,
				// headers: {
				// 	Authorization: localStorage.getItem('accessToken'),
				// },
			})
			.then((res) => {
				setBlogs(res.data.blogs);
				setLoading(false);
			});
	}, []);

	return { loading, blogs };
};

export const useBlog = (id: string) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<blog>({
		id: '',
		author: { name: '' },
		title: '',
		content: '',
		publishDate: '',
	});

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/${id}`, {
				headers: {
					Authorization: localStorage.getItem('accessToken'),
				},
			})
			.then((res) => {
				setBlog(res.data.blog);
				setLoading(false);
			});
	}, [id]);
	return { loading, blog };
};

interface ApiResponse {
	config: any;
	data: { blogs: blog[] };
	headers: any;
	request: any;
	status: number;
	statusText: string;
}

export async function getBlog(): Promise<ApiResponse> {
	return await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all`, {
		withCredentials: true,
	});
}

