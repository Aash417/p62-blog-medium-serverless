import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export const likeRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

likeRouter.use('/*', async (c, next) => {
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

likeRouter.post('/toggle', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		let like;
		const blogId = c.req.queries('blogId') ?? '';
		const searchObj = {
			authorId: Number(c.get('userId')),
			blogId: Number(blogId),
		};

		const isLiked = await prisma.like.findFirst({
			where: searchObj,
		});

		if (isLiked) {
			await prisma.like.delete({
				where: {
					id: isLiked?.id,
				},
			});
		} else {
			like = await prisma.like.create({
				data: searchObj,
			});
		}

		return c.json({ msg: like ? `liked` : `unliked` });
	} catch (error) {}
});

likeRouter.get('/checkLike', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogId = c.req.queries('blogId') ?? '';
		const isLiked = await prisma.like.findFirst({
			where: {
				authorId: Number(c.get('userId')),
				blogId: Number(blogId),
			},
		});

		return c.json({ msg: isLiked ? true : false });
	} catch (error) {
		console.log(error);
		return c.json({ msg: 'Like operation failed' });
	}
});
