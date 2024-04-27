import { checkBookmarkStatus, toggleBookmark } from '@service/apiBookmark';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useBookmark = () => {
	const {
		mutate: bookmarkBlog,
		data: bookmarkData,
		status: isBookmarking,
	} = useMutation({
		mutationFn: ({ blogId }: { blogId: string }): Promise<{ msg: string } | undefined> =>
			toggleBookmark(blogId),
		retry: false,
	});

	return { bookmarkBlog, bookmarkData, isBookmarking };
};

export const useCheckBookmarkStatus = (blogId: string) => {
	const { data: bookmarkStatus } = useQuery({
		queryKey: ['bookmark'],
		queryFn: (): Promise<{ msg: boolean }> => checkBookmarkStatus(blogId),
		retry: false,
	});
	return { bookmarkStatus };
};
