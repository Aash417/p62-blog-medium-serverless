import { blogCardProps } from '@utils/types';
import { Link } from 'react-router-dom';

export function BlogCard({ id, author, title, content, createdAt }: blogCardProps) {
	return (
		<Link to={`/blog/${id}`}>
			<div className='pt-4 pb-2 border-b cursor-pointer border-slate-200'>
				<div className='flex'>
					<div className='flex flex-col justify-center pt-1'>
						<Avatar name={author} />
					</div>
					<div className='pl-2 text-sm font-extralight'>{author}</div>
					<div className='flex flex-col justify-center pl-3'>
						<div className='w-1 h-1 rounded-full bg-slate-500'></div>
					</div>
					<div className='pl-3 text-sm font-thin text-slate-400 '>{createdAt}</div>
				</div>

				<div className='text-2xl font-bold '>{title.slice(0, 100)}</div>
				<div className='text-sm font-extralight'>{content.slice(0, 200) + '...'}</div>
				<div className='pt-4 text-sm font-thin text-slate-500'>{`${Math.ceil(
					content.length / 100
				)} min read`}</div>
			</div>
		</Link>
	);
}

export function Avatar({ name, size = 'small' }: { name: string; size?: string }) {
	return (
		<div
			className={`relative inline-flex items-center justify-center ${
				size === 'small' ? 'w-5 h-5' : 'w-10 h-10'
			} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
		>
			<span
				className={`font-semibold ${
					size === 'small' ? 'text-xs' : 'text-lg'
				} text-gray-600 dark:text-gray-300`}
			>
				{name[0].toUpperCase()}
			</span>
		</div>
	);
}
