import { Avatar } from '@components/BlogCard';
import Loader from '@components/Loader';
import { useBlog } from '@hooks/blogHooks';
import { formatDate } from '@utils/helperFn';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

function Blog() {
	const { id } = useParams();
	const { isLoading, blog } = useBlog(id || '');

	if (isLoading) return <Loader />;

	return (
		<div className='grid w-full grid-cols-12 p-11 max-w-screen-2x'>
			<div className='col-span-8 bg-red-2'>
				<div className='text-4xl font-extrabold'>{blog?.title}</div>
				<div className='p-2 text-slate-500'>{formatDate(blog?.createdAt || '')}</div>
				<div className='pt-4'>{parse(blog?.content || '')}</div>
			</div>
			<div className='col-span-4 pl-6'>
				Author
				<div className='flex w-full'>
					<div className='pt-1 pr-2'>
						<Avatar name={blog?.author.name || ''} />
					</div>
					<div className=''>
						<div className='text-xl font-bold'> {blog?.author.name || 'Anonymous'}</div>
						<div className='pt-2 text-slate-300'>Random catch phrase for user</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Blog;
