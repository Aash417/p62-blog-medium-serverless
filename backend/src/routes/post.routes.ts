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

blogRouter.get('/:id', (c) => {
	const id = c.req.param('id');
	console.log(id);
	return c.text('get blog route');
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

blogRouter.put('/', (c) => {
	return c.text('signin route');
});
