import { getCurrentUser, logInSignUpUser } from '@/service/apiAuth';
import { SignupType } from '@aashishk17/medium-common';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
