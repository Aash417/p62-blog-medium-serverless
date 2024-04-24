import { useQuery } from '@tanstack/react-query';
import { getBlog } from '../hooks/blogHooks';

function Test() {
	const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlog });

	if (isLoading) return <div className=''>loading</div>;

	console.log('data :', data);
	console.log('data?.data :', data?.data);
	console.log('data?.data?.blogs :', data?.data?.blogs);

	const blogs = data?.data?.blogs;
	return <div>{blogs?.map((b) => b.title)}</div>;
}

export default Test;
