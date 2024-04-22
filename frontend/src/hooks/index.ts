import axios from 'axios';
import { useEffect, useState } from 'react';

interface Blog {
	id: string;
	author: { name: string };
	title: string;
	content: string;
	publishDate: string;
}

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);

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
	const [blog, setBlog] = useState<Blog>({
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


export interface blogs {
	id: string;
	author: Author;
	title: string;
	content: string;
}

export interface Author {
	name: string;
}
interface ApiResponse {
	config: any;
	data: { blogs: blogs[] };
	headers: any;
	request: any;
	status: number;
	statusText: string;
}

export async function getBlog(): Promise<ApiResponse> {
	return await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all/`, {
		withCredentials: true,
	});
}