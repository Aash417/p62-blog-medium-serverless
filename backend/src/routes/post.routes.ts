import { UpdatePostType, createPostInput, updatePostInput } from '@aashishk17/medium-common';
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

blogRouter.get('/all', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogs = await prisma.blog.findMany({
			select: {
				id: true,
				author: {
					select: {
						name: true,
					},
				},
				title: true,
				content: true,
				createdAt: true,
			},
		});
		return c.json({ blogs });
	} catch (error) {
		console.log(error);
		return c.text('error occurred in blog route');
	}
});

blogRouter.get('/id/:id', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const id = c.req.param('id');
		const blog = await prisma.blog.findFirst({
			where: {
				id: Number(id),
			},
			select: {
				id: true,
				author: {
					select: {
						name: true,
					},
				},
				title: true,
				content: true,
				createdAt: true,
			},
		});
		return c.json({ blog });
	} catch (error) {
		console.log(error);
		return c.text('error occurred in blog route');
	}
});

blogRouter.get('/getSession', async (c) => {
	return c.json({
		msg: 'auth working',
	});
});

blogRouter.post('/create', async (c) => {
	try {
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
		const blog = await prisma.blog.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: Number(c.get('userId')),
			},
		});
		return c.json({ blog });
	} catch (error) {
		console.log(error);
		return c.text('error occurred in blog route');
	}
});

blogRouter.patch('/update', async (c) => {
	try {
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

		await prisma.blog.update({
			where: {
				id: body.id,
				authorId: Number(userId),
			},
			data: updateFields,
		});

		return c.json({ msg: 'Blog updated successfully.' });
	} catch (error) {
		console.log(error);
		return c.text('error occurred in blog route');
	}
});

blogRouter.get('/myBlogs', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogs = await prisma.blog.findMany({
			where: {
				authorId: Number(c.get('userId')),
			},
			select: {
				id: true,
				author: {
					select: {
						name: true,
					},
				},
				title: true,
				content: true,
				createdAt: true,
			},
		});
		return c.json({ blogs });
	} catch (error) {
		console.log(error);
		return c.text('error occurred in blog route');
	}
});
