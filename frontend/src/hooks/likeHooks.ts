import { checkLikeStatus, getLikeCount, toggleLike } from '@/service/apiLike';
import { queryClient } from '@/utils/helperFn';
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['likeCount'] });
		},
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

export const useLikeCount = (blogId: string) => {
	const { data: likeCount } = useQuery({
		queryKey: ['likeCount'],
		queryFn: () => getLikeCount(blogId),
	});

	return { likeCount };
};
