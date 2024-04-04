import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
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
		next();
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

blogRouter.get('/', (c) => {
	return c.text('signin route');
});

blogRouter.put('/', (c) => {
	return c.text('signin route');
});
