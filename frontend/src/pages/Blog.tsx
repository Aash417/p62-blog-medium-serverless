import { Avatar } from '@/components/InitialsAvatar';
import Loader from '@/components/Loader';
import { useBlog } from '@/hooks/blogHooks';
import { useBookmark, useCheckBookmarkStatus } from '@/hooks/bookmarkHooks';
import { useCheckLikeStatus, useLike, useLikeCount } from '@/hooks/likeHooks';
import { formatDate } from '@/utils/helperFn';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function Blog() {
	const { id } = useParams();
	const { isLoading, blog } = useBlog(id || '');

	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);

	const { likeStatus } = useCheckLikeStatus(id || '');
	const { bookmarkStatus } = useCheckBookmarkStatus(id || '');
	const { likeBlog, isLiking } = useLike();
	const { bookmarkBlog, isBookmarking } = useBookmark();
	const { likeCount } = useLikeCount(id || '');

	function handleLike() {
		likeBlog({ blogId: String(id) });
		if (isLiked) setIsLiked(false);
		else setIsLiked(true);
	}

	function handleBookmark() {
		bookmarkBlog({ blogId: String(id) });
		if (isBookmarked) setIsBookmarked(false);
		else setIsBookmarked(true);
	}

	useEffect(() => {
		setIsLiked(likeStatus?.msg || false);
		setIsBookmarked(bookmarkStatus?.msg || false);
	}, [bookmarkStatus?.msg, likeStatus?.msg]);

	if (isLoading) return <Loader />;

	return (
		<div className='grid w-full grid-cols-12 p-11 max-w-screen-2x'>
			{/* left */}
			<div className='col-span-8 border-r bg-red-2 border-slate-200 '>
				<div className='text-4xl font-extrabold'>{blog?.title}</div>
				<div className='pt-6 font-mono'>{parse(blog?.content || '')}</div>
			</div>
			{/* right */}
			<div className='col-span-4 pl-6'>
				<div className='flex flex-col w-full'>
					{/* upper */}
					<div className='flex flex-row h-10 pt-2 border-b border-slate-200'>
						<Avatar name={blog?.author.name || ''} />
						<div className='pl-2 mb-1'>{blog?.author.name || 'Anonymous'}</div>
						<div className='flex flex-col content-center p-3 font-light align-baseline '>
							<div className='w-1 h-1 rounded-full bg-slate-500'></div>
						</div>
						<div className='font-light center-content'>
							{formatDate(blog?.createdAt || '')}
						</div>
					</div>
					{/* lower */}
					<div className='flex flex-row h-10 gap-2 pt-2'>
						<button onClick={handleLike}>
							{isLiked ? (
								isLiking == 'pending' ? (
									<ClipLoader size={20} />
								) : (
									<BiSolidLike size={20} />
								)
							) : isLiking == 'pending' ? (
								<ClipLoader size={20} />
							) : (
								<BiLike size={20} />
							)}
						</button>
						<span className='pr-4 text-lg'>
							{Number(likeCount?.totalLike) > 0 && likeCount?.totalLike}
						</span>
						<button onClick={handleBookmark}>
							{isBookmarked ? (
								isBookmarking == 'pending' ? (
									<ClipLoader size={20} />
								) : (
									<IoBookmark size={20} />
								)
							) : isBookmarking == 'pending' ? (
								<ClipLoader size={20} />
							) : (
								<IoBookmarkOutline size={20} />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Blog;
