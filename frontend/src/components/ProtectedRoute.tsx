import { useUser } from '@hooks/useUser';
import { useEffect } from 'react';
import Loader from './Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, isLoading } = useUser();

	useEffect(
		function () {
			if (!isLoading && !user) console.log('login now ');
		},
		[isLoading, user]
	);

	console.log(user);
	console.log('fomr ');
	if (isLoading) return <Loader />;
	// if (isError) return <div>some error occured</div>;
	// if (!data) return <div>log in</div>;

	return children;
}
