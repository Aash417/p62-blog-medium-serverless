/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllBlogs } from '@service/apiBlogs';
import { useQuery } from '@tanstack/react-query';
import { blogDataType } from '@utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useBlogs = () => {
	const { data: blogs, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAllBlogs,
	});
	return { isLoading, blogs };
};

export const useBlog = (id: string) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<blogDataType>({
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
