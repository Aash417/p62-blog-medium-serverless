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
	createdAt: string;
}

export interface UserDataType {
	id: number;
	email: string;
	name: string;
	password: string;
	createdAt: string;
}

export type allBlogsResponse = Pick<
	ApiResponse,
	'config' | 'headers' | 'request' | 'status' | 'statusText'
> & { blogs: blogDataType[] };

export type oneBlogResponse = Pick<
	ApiResponse,
	'config' | 'headers' | 'request' | 'status' | 'statusText'
> & { blog: blogDataType };

export type blogCardProps = Pick<blogDataType, 'id' | 'title' | 'content' | 'createdAt'> & {
	author: string;
}; 