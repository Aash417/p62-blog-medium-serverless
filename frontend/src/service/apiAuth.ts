import axios from 'axios';

export async function getCurrentUser() {
	axios
		.get('http://127.0.0.1:8787/api/v1/blog/getSession', {
			withCredentials: true,
		})
		.then((response) => {
			const responseData = response.data;
			console.log(responseData);
			return responseData;
		})
		.catch((error) => {
			if (error.response.status === 403) {
				console.error('Access forbidden:', error.toJSON());
				throw error.response.data;
			} else {
				console.error('Error fetching data:', error);
			}
		});
}
