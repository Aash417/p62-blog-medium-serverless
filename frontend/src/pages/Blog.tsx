import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import { Avatar } from '../components/BlogCard';
import Spinner from '../components/Spinner';
import { useBlog } from '../hooks';

function Blog() {
	const { id } = useParams();
	const { loading, blog } = useBlog(id || '');
	if (loading) return <Spinner />;

	return (
		<div className=''>
			<Appbar />
			<div className='grid w-full grid-cols-12 px-10 pt-12 max-w-screen-2x'>
				<div className='col-span-8 bg-red-2'>
					<div className='text-4xl font-extrabold'>{blog?.title}</div>
					<div className='p-2 text-slate-500'>7 april</div>
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
