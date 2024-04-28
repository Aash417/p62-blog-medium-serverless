import { BlogCard } from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { useMyBlogs } from '@/hooks/blogHooks';
import { formatDate } from '@/utils/helperFn';
import { blogDataType } from '@/utils/types';

export default function Published() {
	const { blogs, isLoading } = useMyBlogs();

	if (isLoading) return <Loader />;
	if (blogs.length == 0)
		return <div className='flex items-center justify-center '>You havent posted yet</div>;

	return (
		<div className='flex items-center justify-center '>
			<div className='w-full font-mono rounded-lg lg:w-2/4 md:w-2/4'>
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
