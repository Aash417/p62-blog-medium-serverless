import { BlogCard } from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { useBlogs } from '@/hooks/blogHooks';
import { formatDate } from '@/utils/helperFn';
import { blogDataType } from '@/utils/types';

function Blogs() {
	const { blogs, isLoading } = useBlogs();

	if (isLoading) return <Loader />;
	if (blogs.length == 0)
		return <div className='flex items-center justify-center '>no post available</div>;

	return (
		<div className='flex items-center justify-center '>
			<div className='w-full rounded-lg lg:w-2/4 md:w-2/4'>
				{blogs.map((blog: blogDataType) => (
					<BlogCard
						key={blog.id}
						id={blog.id}
						author={blog.author.name || 'Anonymous'}
						title={blog.title}
						content={blog.content}
						createdAt={formatDate(blog.createdAt)}
					/>
				))}
			</div>
		</div>
	);
}

export default Blogs;
