import { checkLikeStatus, toggleLike } from '@service/apiLike';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLike = () => {
	const {
		mutate: likeBlog,
		data: likeData,
		status: isLiking,
	} = useMutation({
		mutationFn: ({ blogId }: { blogId: string }): Promise<{ msg: string } | undefined> =>
			toggleLike(blogId),
		retry: false,
	});

	return { likeBlog, likeData, isLiking };
};

export const useCheckLikeStatus = (blogId: string) => {
	const { data: likeStatus } = useQuery({
		queryKey: ['like'],
		queryFn: (): Promise<{ msg: boolean }> => checkLikeStatus(blogId),
		retry: false,
	});
	return { likeStatus };
};
