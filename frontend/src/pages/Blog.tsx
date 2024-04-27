import { Avatar } from '@components/BlogCard';
import Loader from '@components/Loader';
import { useBlog } from '@hooks/blogHooks';
import { useBookmark, useCheckBookmarkStatus } from '@hooks/bookmarkHooks';
import { useCheckLikeStatus, useLike } from '@hooks/likeHooks';
import { formatDate } from '@utils/helperFn';
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
			<div className='col-span-8 bg-red-2'>
				<div className='text-4xl font-extrabold'>{blog?.title}</div>
				<div className='pt-6 font-mono'>{parse(blog?.content || '')}</div>
			</div>
			<div className='col-span-4 pl-6'>
				<div className='flex w-full'>
					<div className='pr-2 '>
						<Avatar name={blog?.author.name || ''} />
					</div>
					<div className='flex gap-5'>
						<div className='text-xl font-bold'> {blog?.author.name || 'Anonymous'}</div>
						<div className=' text-slate-500'>{formatDate(blog?.createdAt || '')}</div>
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
