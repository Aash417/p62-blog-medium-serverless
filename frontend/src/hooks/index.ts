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
			.get(`${import.meta.env.VITE_DatabaseUrl}/api/v1/blog/all/`, {
				headers: {
					Authorization: localStorage.getItem('accessToken'),
				},
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
			.get(`${import.meta.env.VITE_DatabaseUrl}/api/v1/blog/${id}`, {
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
