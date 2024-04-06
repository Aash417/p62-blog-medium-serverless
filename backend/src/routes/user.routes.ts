import { SignupType, signinInput, signupInput } from '@aashishk17/medium-common';
import { Prisma, PrismaClient } from '@prisma/client/edge';
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
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: 'Inputs are not correct',
		});
	}

	try {
		const createFields: SignupType = {
			email: body.email,
			password: body.password,
		};
		if (body.name) createFields.name = body.name;

		const user = await prisma.user.create({
			data: createFields,
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		setCookie(c, 'accessToken', jwt);
		c.header('Authorization', jwt);

		return c.json({ msg: 'user created successfully.', accessToken: jwt });
	} catch (error) {
		c.status(400);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				console.error('Email already exists. Please try a different email address.');
				return c.json({ error: 'Email already exists.' });
			} else {
				console.error(' Prisma error:', error);
				return c.json({ error });
			}
		} else {
			console.error('Unexpected error:', error);
			return c.json({ error });
		}
	}
});

userRouter.post('signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			message: 'Inputs are not correct',
		});
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ error: 'Incorrect email & password.' });
	}
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	setCookie(c, 'accessToken', jwt);
	c.header('Authorization', jwt);

	return c.json({
		msg: 'Logged in successfully',
		accessToken: jwt,
	});
});
