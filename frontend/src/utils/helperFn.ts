import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Handles Axios errors and logs relevant information.
 * @param error - The error object to handle.
 */
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

/**
 * Formats a date string into a localized date string.
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000,
		},
	},
});
export function handleBookmark() {
	bookmarkBlog({ blogId: String(id) });
	if (isBookmarked) setIsBookmarked(false);
	else setIsBookmarked(true);
}