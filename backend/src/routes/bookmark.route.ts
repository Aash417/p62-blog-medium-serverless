import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export const bookmarkRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

bookmarkRouter.use('/*', async (c, next) => {
	const token = getCookie(c, 'accessToken') || c.req.header('Authorization') || '';
	if (!token) {
		c.status(403);
		return c.json({ msg: 'You are not logged in.' });
	}
	const response = await verify(token, c.env.JWT_SECRET);
	if (response.id) {
		c.set('userId', response.id);
		await next();
	} else {
		c.status(403);
		return c.json({
			error: 'unauthorized request.',
		});
	}
});

bookmarkRouter.post('/toggle', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		let bookmark;
		const blogId = c.req.queries('blogId') ?? '';
		const searchObj = {
			authorId: Number(c.get('userId')),
			blogId: Number(blogId),
		};

		const isBookmarked = await prisma.bookmark.findFirst({
			where: searchObj,
		});

		if (isBookmarked) {
			await prisma.bookmark.delete({
				where: {
					id: isBookmarked?.id,
				},
			});
		} else {
			bookmark = await prisma.bookmark.create({
				data: searchObj,
			});
		}

		return c.json({ msg: bookmark ? `bookmarked` : `unbookmarked` });
	} catch (error) {
		console.log(error);
		return c.json({ msg: 'Bookmark operation failed', error });
	}
});

bookmarkRouter.get('/checkBookmark', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogId = c.req.queries('blogId') ?? '';
		const isBookmarked = await prisma.bookmark.findFirst({
			where: {
				authorId: Number(c.get('userId')),
				blogId: Number(blogId),
			},
		});

		return c.json({ msg: isBookmarked ? true : false });
	} catch (error) {
		console.log(error);
		return c.json({ msg: 'Like operation failed' });
	}
});

bookmarkRouter.get('/all', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const savedBookmarks = await prisma.bookmark.findMany({
			select: {
				id: true,
				blogId: true,
				blog: {
					select: {
						title: true,
						content: true,
						createdAt: true,
					},
				},
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json({ savedBookmarks });
	} catch (error) {
		console.log(error);
		return c.json({ msg: 'Failed to fetch your bookmark' });
	}
});
