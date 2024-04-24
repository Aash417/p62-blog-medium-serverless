/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
	config: any;
	headers: any;
	request: any;
	status: number;
	statusText: string;
}

export interface blogDataType {
	id: string;
	author: { name: string };
	title: string;
	content: string;
	publishDate: string;
}

export interface UserDataType {
	id: number;
	email: string;
	name: string;
	password: string;
	createdAt: string;
}

export type allBlogResponse = Pick<
	ApiResponse,
	'config' | 'headers' | 'request' | 'status' | 'statusText'
> & { data: { blogs: blogDataType[] } };
