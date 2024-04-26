import { SignupType } from '@aashishk17/medium-common';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getCurrentUser, logInSignUpUser } from '../service/apiAuth';

export function useUser() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		retry: false,
	});

	return { user, isLoading };
}

export function useAuth() {
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: async ({ type, postInputs }: { type: string; postInputs: SignupType }) => {
			await logInSignUpUser(type, postInputs);

			// await axios.post(
			// 	`${import.meta.env.VITE_BackendUrl}/api/v1/user/${
			// 		type === 'signup' ? 'signup' : 'login'
			// 	}`,
			// 	postInputs,
			// 	{ withCredentials: true }
			// );
		},
		onSuccess: () => {
			toast.success('Welcome');
			navigate('/');
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				if (error.response) toast.error(error.response.data.msg);
			} else {
				toast.error('An error occurred. Please try again later.');
			}
			console.log(error);
		},
	});

	return { mutate };
}
