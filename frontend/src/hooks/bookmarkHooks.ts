import { checkBookmarkStatus, getAllSavedBookmarks, toggleBookmark } from '@/service/apiBookmark';
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

export const useAllBookmarks = () => {
	const { data, isLoading: isBookmarkLoading } = useQuery({
		queryKey: ['bookmarks'],
		queryFn: getAllSavedBookmarks,
		retry: 2,
	});
	const bookmarks = data?.savedBookmarks || [];
	return { bookmarks, isBookmarkLoading };
};
