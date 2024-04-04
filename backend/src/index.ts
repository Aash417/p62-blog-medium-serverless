import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

app.post('/api/v1/signup', async (c) => {
	console.log('working');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
			},
		});

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

		return c.json({ done: user, jwt });
	} catch (e) {
		return c.status(403);
	}
});

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ error: 'user not found' });
	}
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	setCookie(c, 'accessToken', jwt);
	return c.json({ jwt });
});

app.use('/api/v1/blog/*', async (c, next) => {
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

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id');
	console.log(id);
	return c.text('get blog route');
});

app.post('/api/v1/blog', (c) => {
	return c.text('signin route');
});

app.put('/api/v1/blog', (c) => {
	return c.text('signin route');
});

export default app;
