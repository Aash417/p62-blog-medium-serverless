import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Publish() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	return (
		<div className=''>
			<div className='flex justify-center w-full pt-8'>
				<div className='w-full max-w-screen-lg '>
					<input
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						placeholder='Enter a title for blog'
						required
					/>
					<div className='pt-5'></div>
					<textarea
						onChange={(e) => setContent(e.target.value)}
						rows={10}
						className='block pt-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
						placeholder='Write your thoughts here...'
						required
					></textarea>
					<div className='pt-3'></div>
					<button
						onClick={async () => {
							const res = await axios.post(
								`${import.meta.env.VITE_BackendUrl}/api/v1/blog`,
								{
									title,
									content,
								},
								{
									headers: {
										Authorization: localStorage.getItem('accessToken'),
									},
								}
							);

							navigate(`/blog/${res.data.blog.id}`);
						}}
						type='submit'
						className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
					>
						Publish post
					</button>
				</div>
			</div>
		</div>
	);
}

export default Publish;
