import { getCurrentUser } from '@service/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		retry: false,
	});

	return { user, isLoading };
}

export function useLogout() {
	const { data: logout, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return { logout, isLoading };
}
