import { SignupType } from '@aashishk17/medium-common';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth({ type }: { type: 'signup' | 'login' }) {
	const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState<SignupType>({
		name: '',
		email: '',
		password: '',
	});

	async function sendRequest() {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BackendUrl}/api/v1/user/${
					type === 'signup' ? 'signup' : 'login'
				}`,
				postInputs,
				{ withCredentials: true }
			);

			const { accessToken } = res.data;
			localStorage.setItem('accessToken', accessToken);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='flex flex-col justify-center h-screen'>
			<div className='flex justify-center'>
				<div className='p-10 border border-gray-300 bg-gray-50'>
					<div className='px-6 mt-4 text-3xl font-extrabold'>
						{type === 'signup' ? 'Create an account' : 'Login'}
					</div>
					<div className='px-6 text-slate-400'>
						{type === 'signup' ? 'Already have and account?' : 'Dont have and account?'}
						<Link
							to={type === 'signup' ? '/login' : '/signup'}
							className='ml-3 underline '
						>
							{type === 'signup' ? 'Login' : 'Sign up'}
						</Link>
					</div>
					<div className='pt-6'>
						{type === 'signup' && (
							<LabelledInput
								label='Username'
								placeholder='Enter a user name'
								type='text'
								onChange={(e) => {
									setPostInputs((c) => ({
										...c,
										name: e.target.value,
									}));
								}}
							/>
						)}
						<LabelledInput
							label='Email'
							placeholder='a@mail.com'
							type='text'
							onChange={(e) => {
								setPostInputs((c) => ({
									...c,
									email: e.target.value,
								}));
							}}
						/>
						<LabelledInput
							label='Password'
							placeholder='*******'
							type='password'
							onChange={(e) => {
								setPostInputs((c) => ({
									...c,
									password: e.target.value,
								}));
							}}
						/>
						<button
							onClick={sendRequest}
							type='button'
							className='mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
						>
							{type === 'signup' ? 'Sign up' : 'Sign in'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

interface labelledInputType {
	label: string;
	placeholder: string;
	type: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({ label, placeholder, type, onChange }: labelledInputType) {
	return (
		<div>
			<label className='block pt-3 mb-2 text-sm font-semibold text-black'>{label}</label>
			<input
				onChange={onChange}
				type={type}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
				placeholder={placeholder}
				required
			/>
		</div>
	);
}

export default Auth;
