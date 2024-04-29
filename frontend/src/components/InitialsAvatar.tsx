export function Avatar({ name = 'anonymous', size = 'small' }: { name: string; size?: string }) {
	return (
		<div
			className={`relative inline-flex items-center justify-center ${
				size === 'small' ? 'w-6 h-6' : 'w-10 h-10'
			} overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600`}
		>
			<span
				className={`font-semibold ${
					size === 'small' ? 'text-[18px]' : 'text-lg'
				} text-white dark:text-gray-300 `}
			>
				{name[0].toUpperCase()}
			</span>
		</div>
	);
}
