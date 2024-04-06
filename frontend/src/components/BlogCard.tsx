import { Link } from 'react-router-dom';

interface BlogCardProps {
	id: string;
	authorName: string;
	title: string;
	content: string;
	publishDate: string;
}

function BlogCard({ id, authorName, title, content, publishDate }: BlogCardProps) {
	return (
		<Link to={`/blog/${id}`}>
			<div className='border-b border-slate-200 pb-4 pt-4 cursor-pointer'>
				<div className='flex'>
					<div className='flex justify-center flex-col'>
						<Avatar name={authorName} />
					</div>
					<div className='text-sm font-extralight pl-2'>{authorName}</div>
					<div className='justify-center flex-col flex pl-3'>
						<div className='h-1 w-1 bg-slate-500 rounded-full'></div>
					</div>
					<div className='text-sm font-thin text-slate-400 pl-3 '>{publishDate}</div>
				</div>

				<div className='text-xl font-semibold'>{title}</div>

				<div className='text-md font-thin '>{content.slice(0, 100) + '...'}</div>

				<div className='text-slate-500 text-sm font-thin pt-4'>{`${Math.ceil(
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
				size === 'small' ? 'w-4 h-4' : 'w-10 h-10'
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
export default BlogCard;
