import { BlogCard } from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { useAllBookmarks } from '@/hooks/bookmarkHooks';
import { formatDate } from '@/utils/helperFn';

export default function Bookmarks() {
	const { bookmarks, isBookmarkLoading } = useAllBookmarks();

	if (isBookmarkLoading) return <Loader />;

	return (
		<div className='flex items-center justify-center '>
			<div className='w-full font-mono rounded-lg lg:w-2/4 md:w-2/4'>
				{bookmarks.map((blog) => (
					<BlogCard
						key={blog.id}
						id={String(blog.blogId)}
						author={blog.author.name || 'Anonymous'}
						title={blog.blog.title}
						content={blog.blog.content}
						createdAt={formatDate(blog.blog.createdAt)}
					/>
				))}
			</div>
		</div>
	);
}
