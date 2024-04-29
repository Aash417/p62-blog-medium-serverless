import { blogCardProps } from '@/utils/types';
import { Link } from 'react-router-dom';
import { Avatar } from './InitialsAvatar';

export function BlogCard({ id, author, title, content, createdAt }: blogCardProps) {
	return (
		<Link to={`/blog/${id}`}>
			<div className='flex flex-col pb-2 border-b cursor-pointer border-slate-200'>
				{/* header */}
				<div className='flex flex-row h-10 pt-2'>
					<Avatar name={author} />
					<div className='pl-2 mb-1'>{author}</div>
					<div className='flex flex-col content-center p-3 font-light align-baseline '>
						<div className='w-1 h-1 rounded-full bg-slate-500'></div>
					</div>
					<div className='font-light center-content'>{createdAt}</div>
				</div>
				{/* title */}
				<div className='pt-1 h-15 font-Nunito'>
					<div className='text-2xl font-bold '>{title.slice(0, 100)}</div>
				</div>
				{/* footer */}
				<div className='flex flex-row h-10 pt-3 pb-6'>
					<div className='text-sm text-slate-500'>
						{`${Math.ceil(content.length / 1000)} min read`}
					</div>
				</div>
			</div>
		</Link>
	);
}
