import { useQuery } from '@tanstack/react-query';
import { BlogCard } from '../components/BlogCard';
import Loader from '../components/Loader';
import { getBlog } from '../hooks';

function Blogs() {
	const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlog });

	if (isLoading) return <Loader />;

	const blogs = data?.data?.blogs || [];
	return (
		<div className='flex items-center justify-center '>
			<div className='w-full font-mono rounded-lg lg:w-2/4 md:w-2/4'>
				{blogs.map((blog) => (
					<BlogCard
						key={blog.id}
						id={blog.id}
						authorName={blog.author.name || 'Anonymous'}
						title={blog.title}
						content={blog.title}
						publishDate='6 april'
					/>
				))}
			</div>
		</div>
	);
}

export default Blogs;
