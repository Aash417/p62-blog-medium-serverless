import { useQuery } from '@tanstack/react-query';
import BlogCard from '../components/BlogCard';
import { getBlog } from '../hooks';

function Blogs() {
	const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlog });

	if (isLoading) return <div className=''>loading</div>;

	const blogs = data?.data?.blogs || [];
	return (
		<div className=''>
			{/* <Appbar /> */}
			<div className='flex justify-center p-4 '>
				<div className=''></div>
				<div className='max-w-xl'>
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
		</div>
	);
}

export default Blogs;
