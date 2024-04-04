import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post('signup', async (c) => {
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
		console.log(e);
		return c.status(403);
	}
});

userRouter.post('signin', async (c) => {
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
