import { BlogCard } from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { useAllBookmarks } from '@/hooks/bookmarkHooks';
import { formatDate } from '@/utils/helperFn';

export default function Bookmarks() {
	const { bookmarks, isBookmarkLoading } = useAllBookmarks();

	if (isBookmarkLoading) return <Loader />;
	if (bookmarks.length == 0)
		return (
			<div className='flex items-center justify-center h-40 text-2xl font-bold font-Ubuntu'>
				You havent bookmarked any blog yet
			</div>
		);

	return (
		<div className='grid w-full grid-cols-12 p-11 max-w-screen-2x'>
			{/* left */}
			<div className='col-span-8 border-r border-slate-200 '>
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
			{/* right */}
			<div className='col-span-4 pl-6'>
				<div className='flex flex-col w-full'>
					{/* upper */}
					<div className='flex flex-row h-10 pt-2 text-3xl font-bold border-b font-Nunito border-slate-200'>
						Your Reading List
					</div>
					{/* lower */}
				</div>
			</div>
		</div>
	);
}
