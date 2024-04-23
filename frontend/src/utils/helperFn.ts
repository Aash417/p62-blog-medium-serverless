import { AxiosError } from 'axios';

export function handleAxiosError(error: Error | unknown) {
	const axiosError = error as AxiosError;
	if (axiosError.response) {
		throw axiosError.response.data;
	} else if (axiosError.request) {
		console.error('No response received:', axiosError.request);
	} else {
		console.error('Error:', axiosError.message);
	}
	console.error('Error config:', axiosError.config);
}
