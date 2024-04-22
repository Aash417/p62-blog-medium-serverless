import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function getBlog() {
	return await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/blog/all/`, {
		withCredentials: true,
	});
}

function Test() {
	const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlog });
	if (isLoading) return <div className=''>loading</div>;
	console.log(data?.data);

	return <div>testing</div>;
}

export default Test;
