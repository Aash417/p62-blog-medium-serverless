import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

blogRouter.use('/*', async (c, next) => {
	const token = getCookie(c, 'accessToken') || '';
	if (!token) {
		c.status(403);
		return c.text('login first');
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

blogRouter.get('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body = await c.req.json();
		const blog = await prisma.post.findFirst({
			where: {
				id: body.id,
			},
		});
		return c.json({ blog });
	} catch (error) {}
	return c.text('error occurred');
});

blogRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: c.get('userId'),
		},
	});

	return c.json({ blog });
});

blogRouter.patch('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId,
		},
		data: {
			title: body.title,
			content: body.content,
		},
	});

	return c.text('updated successfully.');
});

blogRouter.get('/all', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany();
	return c.json({ blogs });
});
