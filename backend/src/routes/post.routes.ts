import {
	UpdatePostType,
	createPostInput,
	updatePostInput,
} from '@aashishk17/medium-common';
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
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			message: 'Inputs are not correct',
		});
	}

	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: c.get('userId'),
		},
	});
	return c.json({ msg: 'blog created successfully.', blog });
});

blogRouter.patch('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			message: 'Inputs are not correct',
		});
	}

	const updateFields: UpdatePostType = {};
	if (body.title) updateFields.title = body.title;
	if (body.content) updateFields.content = body.content;

	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId,
		},
		data: updateFields,
	});

	return c.json({ msg: 'Blog updated successfully.' });
});

blogRouter.get('/all', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany({
		select: {
			id: true,
			author: {
				select: {
					name: true,
				},
			},
			title: true,
			content: true,
		},
	});
	return c.json({ blogs });
});
