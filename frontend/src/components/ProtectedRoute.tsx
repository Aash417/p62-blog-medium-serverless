import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ProtectedRoute() {
	const { data } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const res = await axios.get('http://127.0.0.1:8787/api/v1/blog/getSession', {
				withCredentials: true,
			});
			return res;
		},
	});
	console.log(data);

	return <div>ProtectedRoute</div>;
}
