import { Link, Outlet } from 'react-router-dom';
import { Avatar } from './BlogCard';

function Applayout() {
	return (
		<div>
			<header className='flex justify-between px-10 py-4 border-b'>
				<Link to='/blogs'>
					<div className='flex flex-col justify-center pt-1 font-mono text-2xl font-extrabold cursor-pointer'>
						BlogMedium
					</div>
				</Link>
				<nav>
					<Link to={'/publish'}>
						<button
							type='button'
							className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 rounded-full'
						>
							New
						</button>
					</Link>
					<Avatar name='aash' size='big' />
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default Applayout;
