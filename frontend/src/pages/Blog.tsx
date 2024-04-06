import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { Avatar } from '../components/BlogCard';
import { useBlog } from '../hooks';

function Blog() {
	const { id } = useParams();
	const { loading, blog } = useBlog(id || '');
	if (loading) return <div className=''>loading</div>;

	return (
		<div className=''>
			<Appbar />
			<div className='grid grid-cols-12 px-10 w-full max-w-screen-2x pt-12'>
				<div className='col-span-8 bg-red-2'>
					<div className='text-4xl font-extrabold'>{blog?.title}</div>
					<div className='text-slate-500 p-2'>7 april</div>
					<div className='pt-4'>{blog?.content}</div>
				</div>
				<div className='col-span-4 pl-6'>
					Author
					<div className='flex w-full'>
						<div className='pt-1 pr-2'>
							<Avatar name={blog?.author.name} />
						</div>
						<div className=''>
							<div className='text-xl font-bold'>
								{' '}
								{blog?.author.name || 'Anonymous'}
							</div>
							<div className='pt-2 text-slate-300'>Random catch phrase for user</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Blog;
