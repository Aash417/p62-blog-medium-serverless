import { BlogCard } from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { useMyBlogs } from '@/hooks/blogHooks';
import { formatDate } from '@/utils/helperFn';
import { blogDataType } from '@/utils/types';

export default function Published() {
	const { blogs, isLoading } = useMyBlogs();

	if (isLoading) return <Loader />;
	if (blogs.length == 0)
		return (
			<div className='flex items-center justify-center h-40 text-2xl font-bold font-Ubuntu'>You havent posted any blog yet </div>
		);

	return (
		<div className='grid w-full grid-cols-12 p-11 max-w-screen-2x'>
			{/* left */}
			<div className='col-span-8 border-r border-slate-200 '>
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
			{/* right */}
			<div className='col-span-4 pl-6'>
				<div className='flex flex-col w-full'>
					{/* upper */}
					<div className='flex flex-row h-10 pt-2 text-3xl font-bold border-b font-Nunito border-slate-200'>
						Your Published Blogs
					</div>
					{/* lower */}
				</div>
			</div>
		</div>
	);
}


