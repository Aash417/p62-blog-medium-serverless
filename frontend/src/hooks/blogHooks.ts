/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllBlogs, getOneBlog } from '@service/apiBlogs';
import { useQuery } from '@tanstack/react-query';

export const useBlogs = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAllBlogs,
	});
	const blogs = data?.blogs || [];
	return { isLoading, blogs };
};

export const useBlog = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['blog'],
		queryFn: () => getOneBlog(id),
	});
	const blog = data?.blog;
	return { isLoading, blog };
};

// export const useBlog = (id: string) => {
// 	const [loading, setLoading] = useState(true);
// 	const [blog, setBlog] = useState<blogDataType>({
// 		id: '',
// 		author: { name: '' },
// 		title: '',
// 		content: '',
// 		publishDate: '',
// 	});

// 	useEffect(() => {
// 		axios
// 			.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/${id}`, {
// 				headers: {
// 					Authorization: localStorage.getItem('accessToken'),
// 				},
// 			})
// 			.then((res) => {
// 				setBlog(res.data.blog);
// 				setLoading(false);
// 			});
// 	}, [id]);
// 	return { loading, blog };
// };
