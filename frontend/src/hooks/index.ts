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
			.get(`${import.meta.env.VITE_DatabaseUrl}/api/v1/blog/all`, { withCredentials: true })
			.then((res) => {
				console.log(res);
				setBlogs(res.data.blogs);
				setLoading(false);
			});
	}, []);

	return { loading, blogs };
};
