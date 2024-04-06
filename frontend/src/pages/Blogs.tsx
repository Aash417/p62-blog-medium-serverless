import Appbar from '../components/Appbar';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks';

function Blogs() {
	const { loading, blogs } = useBlogs();
	if (loading) {
		return <div className=''>...loading</div>;
	}

	return (
		<div className=''>
			<Appbar />
			<div className='flex justify-center p-4 '>
				<div className=''></div>
				<div className='max-w-xl'>
					{blogs.map((blog) => (
						<BlogCard
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
