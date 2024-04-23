import { useUser } from '@hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, isLoading } = useUser();
	const navigate = useNavigate();
	useEffect(
		function () {
			if (!isLoading && !user) navigate('/login');
		},
		[isLoading, navigate, user]
	);

	if (isLoading) return <Loader />;
	if (user) return children;
}
